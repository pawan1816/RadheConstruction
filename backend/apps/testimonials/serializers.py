"""Testimonials serializers."""
from rest_framework import serializers
from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    project_title = serializers.CharField(source='project.title', read_only=True, default='')

    class Meta:
        model = Testimonial
        fields = ['id', 'client_name', 'client_photo', 'designation', 'company',
                  'content', 'rating', 'video_url', 'project', 'project_title',
                  'is_featured', 'is_active', 'created_at']