"""Leads serializers."""
from rest_framework import serializers
from .models import SalesStage, Lead, LeadNote, LeadFollowUp


class SalesStageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesStage
        fields = ['id', 'name', 'slug', 'sort_order', 'color']


class LeadNoteSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = LeadNote
        fields = ['id', 'lead', 'user', 'user_name', 'note', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class LeadFollowUpSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = LeadFollowUp
        fields = ['id', 'lead', 'user', 'user_name', 'follow_up_date', 'type', 'notes', 'completed']
        read_only_fields = ['id', 'user']


class LeadSerializer(serializers.ModelSerializer):
    notes = LeadNoteSerializer(many=True, read_only=True)
    follow_ups = LeadFollowUpSerializer(many=True, read_only=True)
    assigned_name = serializers.CharField(source='assigned_to.get_full_name', read_only=True, default='')
    stage_name = serializers.CharField(source='stage.name', read_only=True, default='')

    class Meta:
        model = Lead
        fields = ['id', 'name', 'email', 'phone', 'source', 'service_interest', 'budget_range',
                  'location', 'message', 'status', 'stage', 'stage_name', 'assigned_to', 'assigned_name',
                  'score', 'notes', 'next_follow_up', 'follow_ups', 'created_at', 'updated_at']
        read_only_fields = ['id', 'score', 'created_at', 'updated_at']


class LeadCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['name', 'email', 'phone', 'source', 'service_interest', 'budget_range',
                  'location', 'message']