"""
Analytics app — Dashboard statistics and event tracking
"""
from django.db import models
from apps.core.models import TimeStampedModel


class AnalyticsEvent(TimeStampedModel):
    """Track user events for analytics."""
    user = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True)
    event_type = models.CharField(max_length=100)
    event_data = models.JSONField(default=dict, blank=True)
    page_url = models.URLField(blank=True)
    referrer = models.URLField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    session_id = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.event_type} at {self.created_at}"


class DailyStat(TimeStampedModel):
    """Aggregated daily statistics for the admin dashboard."""
    date = models.DateField(unique=True)
    total_leads = models.PositiveIntegerField(default=0)
    total_bookings = models.PositiveIntegerField(default=0)
    total_quotations = models.PositiveIntegerField(default=0)
    total_revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    new_users = models.PositiveIntegerField(default=0)
    page_views = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"Stats for {self.date}"