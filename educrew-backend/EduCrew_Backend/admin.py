from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import ResearchPaper, StudyMaterial, PresentationSlide, Presentation, CodeSession, ProjectPlan, ProjectTask, QualityReview


admin.site.register(ResearchPaper)
admin.site.register(StudyMaterial)
admin.site.register(PresentationSlide)
admin.site.register(Presentation)
admin.site.register(CodeSession)
admin.site.register(QualityReview)
admin.site.register(ProjectTask)
admin.site.register(ProjectPlan)

