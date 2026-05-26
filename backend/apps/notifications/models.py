"""
Notifications app — Multi-channel notification system
"""
from django.db import models
from apps.core.models import TimeStampedModel


class Notification(TimeStampedModel):
    """User notifications across channels."""
    TYPE_CHOICES = [
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('push', 'Push Notification'),
        ('whatsapp', 'WhatsApp'),
        ('in_app', 'In-App'),
    ]
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=300)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='in_app')
    is_read = models.BooleanField(default=False)
    link = models.URLField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} → {self.user.get_full_name()}"