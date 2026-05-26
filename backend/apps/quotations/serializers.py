"""Quotations serializers."""
from rest_framework import serializers
from .models import Quotation, QuotationItem


class QuotationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuotationItem
        fields = ['id', 'name', 'description', 'quantity', 'unit', 'unit_price', 'total']


class QuotationSerializer(serializers.ModelSerializer):
    items = QuotationItemSerializer(many=True, read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True, default='')
    service_name = serializers.CharField(source='service.name', read_only=True, default='')

    class Meta:
        model = Quotation
        fields = ['id', 'user', 'user_name', 'service', 'service_name', 'project_type',
                  'budget_range', 'area_sqft', 'floors', 'rooms', 'requirements',
                  'documents', 'images', 'status', 'estimated_cost_min', 'estimated_cost_max',
                  'admin_notes', 'pdf_file', 'items', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'status', 'estimated_cost_min', 'estimated_cost_max',
                            'admin_notes', 'pdf_file', 'created_at', 'updated_at']


class QuotationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = ['service', 'project_type', 'budget_range', 'area_sqft', 'floors',
                  'rooms', 'requirements', 'documents', 'images']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['status'] = 'submitted'
        return super().create(validated_data)