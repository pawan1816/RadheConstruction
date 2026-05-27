"""Leads admin."""
from django.contrib import admin
from .models import SalesStage, Lead, LeadNote, LeadFollowUp


@admin.register(SalesStage)
class SalesStageAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'sort_order', 'color']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'source', 'service_interest', 'status', 'score', 'assigned_to', 'created_at']
    list_filter = ['status', 'source', 'assigned_to']
    search_fields = ['name', 'email', 'phone', 'message']
    list_editable = ['status', 'assigned_to']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Contact Info', {
            'fields': ('name', 'email', 'phone', 'location')
        }),
        ('Lead Details', {
            'fields': ('source', 'service_interest', 'budget_range', 'message', 'status', 'stage', 'score')
        }),
        ('Assignment', {
            'fields': ('assigned_to', 'notes', 'next_follow_up')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(LeadNote)
class LeadNoteAdmin(admin.ModelAdmin):
    list_display = ['lead', 'user', 'created_at']
    list_filter = ['created_at']


@admin.register(LeadFollowUp)
class LeadFollowUpAdmin(admin.ModelAdmin):
    list_display = ['lead', 'user', 'follow_up_date', 'type', 'completed']
    list_filter = ['type', 'completed']