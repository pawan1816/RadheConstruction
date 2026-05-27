"""Careers app — Job applications with resume upload."""
from django.db import models
from apps.core.models import TimeStampedModel


class JobApplication(TimeStampedModel):
    """Job application submitted through the careers page."""
    STATUS_CHOICES = [
        ('new', 'New'),
        ('reviewed', 'Reviewed'),
        ('shortlisted', 'Shortlisted'),
        ('interview_scheduled', 'Interview Scheduled'),
        ('offered', 'Offered'),
        ('hired', 'Hired'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    position = models.CharField(max_length=200)
    cover_note = models.TextField(blank=True)
    resume = models.FileField(upload_to='resumes/%Y/%m/', help_text='PDF, DOC, DOCX — max 5 MB')
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Job Application'
        verbose_name_plural = 'Job Applications'

    def __str__(self):
        return f"{self.name} — {self.position} ({self.status})"