"""
Testimonials app — Client reviews, ratings, video testimonials
"""
from django.db import models
from apps.core.models import TimeStampedModel


class Testimonial(TimeStampedModel):
    """Client testimonials."""
    client_name = models.CharField(max_length=200)
    client_photo = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    designation = models.CharField(max_length=200, blank=True)
    company = models.CharField(max_length=200, blank=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    video_url = models.URLField(blank=True, help_text='Video testimonial URL')
    project = models.ForeignKey('projects.Project', on_delete=models.SET_NULL, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.client_name} — {self.rating}★"