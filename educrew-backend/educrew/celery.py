import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'educrew.settings')

app = Celery('your_project_name')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Periodic tasks schedule
app.conf.beat_schedule = {
    'daily-morning-reminders': {
        'task': 'planner.tasks.schedule_daily_reminders',
        'schedule': 86400.0,  # Every 24 hours (in seconds)
    },
}