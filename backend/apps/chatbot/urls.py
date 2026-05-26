"""Chatbot URLs."""
from django.urls import path
from .views import chat_message

urlpatterns = [
    path('message/', chat_message, name='chatbot-message'),
]