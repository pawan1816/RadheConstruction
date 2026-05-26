"""
Bookings app — Appointment booking, slot management, site visits
"""
from django.db import models
from apps.core.models import TimeStampedModel


class Booking(TimeStampedModel):
    """Customer booking / consultation request."""
    BOOKING_TYPE_CHOICES = [
        ('consultation', 'Consultation'),
        ('site_visit', 'Site Visit'),
        ('design_review', 'Design Review'),
        ('project_discussion', 'Project Discussion'),
    ]
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('rescheduled', 'Rescheduled'),
    ]

    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey('services.Service', on_delete=models.SET_NULL, null=True, blank=True)
    engineer = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_bookings', limit_choices_to={'role': 'engineer'})
    project = models.ForeignKey('projects.Project', on_delete=models.SET_NULL, null=True, blank=True)
    booking_type = models.CharField(max_length=30, choices=BOOKING_TYPE_CHOICES, default='consultation')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    meeting_link = models.URLField(blank=True, help_text='Zoom/Google Meet link')
    location = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ['-date', '-start_time']

    def __str__(self):
        return f"{self.user.get_full_name()} — {self.get_booking_type_display()} on {self.date}"


class SiteVisit(TimeStampedModel):
    """Site visit booking for property inspection."""
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name='site_visits', null=True, blank=True)
    project = models.ForeignKey('projects.Project', on_delete=models.SET_NULL, null=True, blank=True)
    address = models.TextField()
    visit_date = models.DateField()
    visit_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    notes = models.TextField(blank=True)
    feedback = models.TextField(blank=True)

    class Meta:
        ordering = ['-visit_date']

    def __str__(self):
        return f"Site visit on {self.visit_date}"