from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import datetime, timedelta
from .models import ProjectTask, ProjectPlan

@shared_task
def send_task_reminder_email(task_id):
    """
    Send reminder email for a specific task
    """
    try:
        task = ProjectTask.objects.select_related('project', 'project__user').get(id=task_id)
        
        # Don't send if already done or already sent
        if task.status == 'done' or task.reminder_sent:
            return f"Task {task_id} already completed or reminder sent"
        
        user = task.project.user
        user_email = task.notification_email or user.email
        
        if not user_email:
            return f"No email for task {task_id}"
        
        # Calculate days until deadline
        days_until_deadline = (task.deadline - timezone.now().date()).days
        
        # Email subject based on urgency
        if days_until_deadline < 0:
            subject = f"⚠️ OVERDUE: {task.title[:50]}..."
            urgency = "OVERDUE"
        elif days_until_deadline == 0:
            subject = f"🔴 Due Today: {task.title[:50]}..."
            urgency = "DUE TODAY"
        elif days_until_deadline == 1:
            subject = f"🟡 Due Tomorrow: {task.title[:50]}..."
            urgency = "DUE TOMORROW"
        else:
            subject = f"📋 Reminder: {task.title[:50]}..."
            urgency = f"Due in {days_until_deadline} days"
        
        # Email content
        message = f"""
Hello {user.first_name or user.username},

This is a reminder about your project task:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 TASK: {task.title}
🎯 PROJECT: {task.project.title}
⚡ PRIORITY: {task.priority.upper()}
⏰ STATUS: {urgency}
📅 DEADLINE: {task.deadline}
⏱️  ESTIMATED TIME: {task.estimate_hours} hours
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task Details:
{task.title}

To view your full project plan, visit:
http://localhost:3000/planner

Keep up the great work!
EduCrew Team
        """
        
        html_message = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
        .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
        .task-box {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }}
        .urgency-high {{ color: #e74c3c; font-weight: bold; }}
        .urgency-medium {{ color: #f39c12; font-weight: bold; }}
        .urgency-low {{ color: #27ae60; font-weight: bold; }}
        .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }}
        .footer {{ text-align: center; margin-top: 30px; color: #666; font-size: 12px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 Task Reminder</h1>
            <p>Don't let your deadlines slip away!</p>
        </div>
        <div class="content">
            <p>Hello <strong>{user.first_name or user.username}</strong>,</p>
            
            <div class="task-box">
                <h2 style="margin-top: 0;">{task.title}</h2>
                <p><strong>Project:</strong> {task.project.title}</p>
                <p><strong>Priority:</strong> <span class="urgency-{task.priority}">{task.priority.upper()}</span></p>
                <p><strong>Status:</strong> <span class="{'urgency-high' if days_until_deadline <= 0 else 'urgency-medium' if days_until_deadline <= 2 else 'urgency-low'}">{urgency}</span></p>
                <p><strong>Deadline:</strong> {task.deadline}</p>
                <p><strong>Estimated Time:</strong> {task.estimate_hours} hours</p>
            </div>
            
            <p style="text-align: center;">
                <a href="http://localhost:3000/planner" class="button">View Project Plan</a>
            </p>
        </div>
        <div class="footer">
            <p>You're receiving this because you have task reminders enabled in EduCrew.</p>
            <p>© 2026 EduCrew. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
        """
        
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            html_message=html_message,
            fail_silently=False,
        )
        
        # Mark as sent
        task.reminder_sent = True
        task.save(update_fields=['reminder_sent'])
        
        return f"Reminder sent for task {task_id} to {user_email}"
        
    except ProjectTask.DoesNotExist:
        return f"Task {task_id} not found"
    except Exception as e:
        return f"Error sending reminder for task {task_id}: {str(e)}"


@shared_task
def schedule_daily_reminders():
    """
    Schedule reminders for all pending tasks with reminder_date = today
    Run this daily via celery beat
    """
    today = timezone.now().date()
    
    # Get all tasks where reminder_date is today and not yet sent
    tasks_to_remind = ProjectTask.objects.filter(
        reminder_date=today,
        reminder_sent=False,
        status__in=['pending', 'in_progress']
    ).select_related('project', 'project__user')
    
    scheduled_count = 0
    for task in tasks_to_remind:
        # Schedule immediate reminder
        send_task_reminder_email.delay(task.id)
        scheduled_count += 1
    
    return f"Scheduled {scheduled_count} reminders for {today}"


@shared_task
def schedule_upcoming_deadlines():
    """
    Send reminders for tasks due in 1-2 days (even if no reminder_date set)
    Run this daily
    """
    today = timezone.now().date()
    tomorrow = today + timedelta(days=1)
    day_after = today + timedelta(days=2)
    
    # Tasks due tomorrow or day after, not completed, reminder not sent
    upcoming_tasks = ProjectTask.objects.filter(
        deadline__in=[tomorrow, day_after],
        status__in=['pending', 'in_progress'],
        reminder_sent=False
    ).exclude(
        reminder_date=today  # Don't duplicate if already scheduled
    ).select_related('project', 'project__user')
    
    sent_count = 0
    for task in upcoming_tasks:
        send_task_reminder_email.delay(task.id)
        sent_count += 1
    
    return f"Sent {sent_count} upcoming deadline reminders"


@shared_task
def send_overdue_notifications():
    """
    Send notifications for overdue tasks
    Run this daily
    """
    today = timezone.now().date()
    
    overdue_tasks = ProjectTask.objects.filter(
        deadline__lt=today,
        status__in=['pending', 'in_progress'],
        reminder_sent=False
    ).select_related('project', 'project__user')
    
    sent_count = 0
    for task in overdue_tasks:
        send_task_reminder_email.delay(task.id)
        sent_count += 1
    
    return f"Sent {sent_count} overdue notifications"