"""Chatbot admin."""
from django.contrib import admin
from .models import ChatSession, ChatMessage


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'user', 'is_active', 'created_at']
    list_filter = ['is_active']


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['session', 'message_type', 'created_at']
    list_filter = ['message_type']
    search_fields = ['message', 'response']