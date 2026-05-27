"""Careers serializers."""
from rest_framework import serializers
from .models import JobApplication


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'name', 'email', 'phone', 'position', 'cover_note', 'resume', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['name', 'email', 'phone', 'position', 'cover_note', 'resume']

    def validate_resume(self, value):
        max_size = 5 * 1024 * 1024  # 5 MB
        if value.size > max_size:
            raise serializers.ValidationError('Resume must be under 5 MB.')
        allowed_types = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ]
        if value.content_type not in allowed_types:
            raise serializers.ValidationError('Only PDF, DOC, DOCX files are accepted.')
        return value