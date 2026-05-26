"""
Chatbot app — AI chatbot assistant placeholder
"""
import uuid
from django.db import models
from apps.core.models import TimeStampedModel


class ChatSession(TimeStampedModel):
    """Chat session between user and AI assistant."""
    session_id = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True, related_name='chat_sessions')
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Session {self.session_id}"


class ChatMessage(TimeStampedModel):
    """Individual messages in a chat session."""
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    message = models.TextField()
    response = models.TextField(blank=True)
    message_type = models.CharField(max_length=10, choices=[
        ('user', 'User'),
        ('bot', 'Bot'),
    ])
    metadata = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.message_type}: {self.message[:50]}"