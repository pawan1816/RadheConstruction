"""Testimonials admin."""
from django.contrib import admin
from .models import Testimonial


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'rating', 'is_featured', 'is_active', 'created_at']
    list_filter = ['rating', 'is_featured', 'is_active']
    search_fields = ['client_name', 'content']
    list_editable = ['is_featured', 'is_active']