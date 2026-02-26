from django.db import models

# Create your models here.
from django.db import models

from django.contrib.auth.models import User

class ResearchPaper(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    summary = models.TextField()
    citation = models.TextField(blank=True)

    def __str__(self):
        return self.title




class StudyMaterial(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to='study_materials/', null=True, blank=True)
    filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)   # 🔹 ADD THIS
    summary = models.TextField(blank=True)
    flashcards = models.JSONField(default=list)
    quiz = models.JSONField(default=list)
    flowchart = models.TextField(blank=True)
    mindmap = models.TextField(blank=True)  # optional



"""
✅ UPDATED MODELS.PY - Add slide type and diagram tracking
EduCrew_Backend/presentations/models.py
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Presentation(models.Model):
    """Presentation model - stores presentation metadata"""
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='presentations')
    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    
    # Content source
    content_provided = models.BooleanField(default=False)  # True if from custom content
    
    # File storage
    pptx_file = models.FileField(upload_to='presentations/', blank=True, null=True)
    pdf_file = models.FileField(upload_to='presentations/', blank=True, null=True)
    
    # Status tracking
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Metadata
    slides_count = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"{self.title} ({self.slides_count} slides)"


class PresentationSlide(models.Model):
    """Individual slide in presentation"""
    
    SLIDE_TYPE_CHOICES = [
        ('title', 'Title Slide'),
        ('content', 'Content Slide'),
        ('conclusion', 'Conclusion Slide'),
        ('comparison', 'Comparison Slide'),
        ('process', 'Process/Flowchart Slide'),
    ]
    
    DIAGRAM_TYPE_CHOICES = [
        ('none', 'No Diagram'),
        ('flowchart', 'Flowchart'),
        ('comparison', 'Comparison Grid'),
        ('timeline', 'Timeline'),
        ('hierarchy', 'Hierarchy'),
    ]
    
    presentation = models.ForeignKey(
        Presentation, 
        on_delete=models.CASCADE, 
        related_name='slides'
    )
    
    # Slide content
    slide_number = models.IntegerField()
    title = models.CharField(max_length=255)
    content = models.JSONField(default=list)  # Bullets as JSON list
    
    # Slide type for styling
    slide_type = models.CharField(
        max_length=20, 
        choices=SLIDE_TYPE_CHOICES, 
        default='content'
    )
    
    # Diagram type for layout
    diagram_type = models.CharField(
        max_length=20, 
        choices=DIAGRAM_TYPE_CHOICES, 
        default='none'
    )
    
    # Image URL (for generated images)
    image_url = models.URLField(blank=True, null=True, max_length=500)
    
    # Notes (for speaker notes)
    speaker_notes = models.TextField(blank=True, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['presentation', 'slide_number']
        unique_together = ['presentation', 'slide_number']
        indexes = [
            models.Index(fields=['presentation', 'slide_number']),
            models.Index(fields=['slide_type']),
            models.Index(fields=['diagram_type']),
        ]
    
    def __str__(self):
        return f"Slide {self.slide_number}: {self.title}"
    
    @property
    def bullets(self):
        """Get bullets from content JSON"""
        return self.content if isinstance(self.content, list) else []





class CodeSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    language = models.CharField(max_length=16, default='python')
    code = models.TextField()
    review = models.TextField(blank=True)
    debug_help = models.TextField(blank=True)
    explanation = models.TextField(blank=True)
    generated_code = models.TextField(blank=True)
    sandbox_output = models.TextField(blank=True)
    sandbox_error = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    practice_challenge = models.TextField(blank=True, default='')
    time_limit_minutes = models.IntegerField(blank=True, null=True)
    animation_trace = models.TextField(blank=True, default="")  # NEW
    created_at = models.DateTimeField(auto_now_add=True)
    is_interview = models.BooleanField(default=False)
    interview_problem = models.TextField(blank=True, default="")   # problem statement
    interview_difficulty = models.CharField(max_length=16, blank=True, default="")
    interview_started_at = models.DateTimeField(blank=True, null=True)
    interview_ended_at = models.DateTimeField(blank=True, null=True)
    interview_score = models.IntegerField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user} - {self.language} - {self.created_at}"

    def __str__(self):
        return f"CodeSession #{self.id} by {self.user.username}"




from django.db import models
from django.contrib.auth.models import User
class ProjectPlan(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='project_plans')
    title = models.CharField(max_length=255)
    raw_plan = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title
class ProjectTask(models.Model):
    PRIORITY_CHOICES = [
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ] 
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]
    
    project = models.ForeignKey(ProjectPlan, on_delete=models.CASCADE, related_name='tasks')
    task_id = models.CharField(max_length=50)
    title = models.TextField()
    date = models.DateField()  # When to work on it
    deadline = models.DateField()  # Final deadline
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    estimate_hours = models.FloatField(default=1)
    reminder_date = models.DateField(null=True, blank=True)
    
    
    # NEW: Email notification tracking
    reminder_sent = models.BooleanField(default=False)
    reminder_scheduled = models.BooleanField(default=False)
    notification_email = models.EmailField(null=True, blank=True)  # Store user's email
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date', 'deadline']
    
    def __str__(self):
        return f"{self.task_id} - {self.title[:50]}"

class ProjectTask(models.Model):
    project = models.ForeignKey(ProjectPlan, on_delete=models.CASCADE, related_name="tasks")
    task_id = models.CharField(max_length=64)        # id from JSON
    title = models.CharField(max_length=255)
    date = models.DateField()
    deadline = models.DateField()
    priority = models.CharField(max_length=16, default="medium")
    status = models.CharField(max_length=16, default="pending")  # pending / in_progress / done
    estimate_hours = models.FloatField(default=1.0)
    reminder_date = models.DateField(null=True, blank=True)


    



class QualityReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    filename = models.CharField(max_length=255, blank=True)
    original_text = models.TextField()

    # LLM quality analysis
    quality_score = models.IntegerField(null=True, blank=True)
    quality_issues = models.JSONField(default=list, blank=True)
    overall_feedback = models.TextField(blank=True)

    # internal similarity (plagiarism-style)
    similarity_percent = models.FloatField(null=True, blank=True)
    word_count = models.IntegerField(null=True, blank=True)
    page_count = models.IntegerField(null=True, blank=True)
    match_groups = models.JSONField(default=dict, blank=True)
    top_sources = models.JSONField(default=list, blank=True)
    raw_plagiarism_report = models.JSONField(default=dict, blank=True)


    grammar_score = models.IntegerField(default=0)
    style_score = models.IntegerField(default=0)
    citation_score = models.IntegerField(default=0)
    requirement_match_score = models.IntegerField(default=0)






    def __str__(self):
        return f"QualityReview #{self.id} - {self.user.username}"
