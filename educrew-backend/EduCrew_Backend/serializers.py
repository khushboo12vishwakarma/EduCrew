
from rest_framework import serializers
from .models import Presentation, PresentationSlide, CodeSession



class PresentationSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentationSlide
        fields = [
            'id',
            'slide_number',
            'title',
            'content',          # bullets (JSON list)
            'slide_type',
            'diagram_type',
            'image_url',
            'speaker_notes',
            'created_at',
            'updated_at',
        ]


class PresentationSerializer(serializers.ModelSerializer):
    slides = PresentationSlideSerializer(many=True, read_only=True)

    class Meta:
        model = Presentation
        fields = [
            'id',
            'title',
            'topic',
            'description',
            'content_provided',
            'pptx_file',
            'pdf_file',
            'status',
            'slides_count',
            'created_at',
            'updated_at',
            'slides',
        ]

        read_only_fields = [
            'id',
            'pptx_file',
            'pdf_file',
            'status',
            'slides_count',
            'created_at',
            'updated_at',
        ]



from rest_framework import serializers
from .models import CodeSession


class CodeSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSession
        fields = [
            "id",
            "language",
            "code",
            "review",
            "debug_help",
            "explanation",
            "generated_code",
            "sandbox_output",
            "sandbox_error",
            "practice_challenge",
            "time_limit_minutes",
            "animation_trace",   # NEW
            "created_at",
            "user",
           "is_interview",
            "interview_problem",
            "interview_difficulty",
            "interview_started_at",
            "interview_ended_at",
            "interview_score",
        
        
        ]



# serializers.py

from rest_framework import serializers
from .models import QualityReview


class QualityReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = QualityReview
        fields = [
            "id",
            "created_at",
            "filename",
            "original_text",
            "quality_score",
            "quality_issues",
            "overall_feedback",
            "similarity_percent",
            "word_count",
            "page_count",
            "match_groups",
            "top_sources",
            "raw_plagiarism_report",
            'grammar_score',        # Add this
            'style_score',          # Add this
            'citation_score',       # Add this
            'requirement_match_score',
        ]
