"""Analytics admin."""
from django.contrib import admin
from .models import AnalyticsEvent, DailyStat


@admin.register(AnalyticsEvent)
class AnalyticsEventAdmin(admin.ModelAdmin):
    list_display = ['event_type', 'user', 'page_url', 'created_at']
    list_filter = ['event_type', 'created_at']
    search_fields = ['event_type', 'page_url']
    date_hierarchy = 'created_at'


@admin.register(DailyStat)
class DailyStatAdmin(admin.ModelAdmin):
    list_display = ['date', 'total_leads', 'total_bookings', 'total_quotations', 'total_revenue', 'new_users', 'page_views']
    list_editable = ['total_leads', 'total_bookings']
    date_hierarchy = 'date'