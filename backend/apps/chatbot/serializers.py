"""Chatbot serializers."""
from rest_framework import serializers
from .models import ChatSession, ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'message', 'response', 'message_type', 'created_at']
        read_only_fields = ['id', 'response', 'created_at']


class ChatSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'session_id', 'messages', 'created_at']
        read_only_fields = ['id', 'session_id', 'created_at']


class ChatRequestSerializer(serializers.Serializer):
    session_id = serializers.UUIDField(required=False)
    message = serializers.CharField()