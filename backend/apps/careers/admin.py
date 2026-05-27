"""Careers admin."""
from django.contrib import admin
from .models import JobApplication


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'email', 'phone', 'status', 'created_at']
    list_filter = ['status', 'position', 'created_at']
    search_fields = ['name', 'email', 'phone', 'position']
    list_editable = ['status']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Applicant', {
            'fields': ('name', 'email', 'phone', 'position'),
        }),
        ('Application', {
            'fields': ('cover_note', 'resume'),
        }),
        ('Status & Notes', {
            'fields': ('status', 'admin_notes', 'created_at', 'updated_at'),
        }),
    )