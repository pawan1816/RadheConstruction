"""Bookings admin."""
from django.contrib import admin
from .models import Booking, SiteVisit


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'booking_type', 'date', 'start_time', 'end_time', 'status', 'engineer', 'created_at']
    list_filter = ['status', 'booking_type', 'date']
    search_fields = ['user__email', 'user__first_name', 'notes', 'location']
    list_editable = ['status', 'engineer']
    date_hierarchy = 'date'


@admin.register(SiteVisit)
class SiteVisitAdmin(admin.ModelAdmin):
    list_display = ['id', 'address', 'visit_date', 'visit_time', 'status']
    list_filter = ['status', 'visit_date']