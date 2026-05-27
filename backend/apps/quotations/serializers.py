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
    """Accepts name/phone/email for guest submissions (stored in CRM Lead, not in Quotation model)."""
    name = serializers.CharField(required=False, default='Guest', write_only=True)
    phone = serializers.CharField(required=False, default='', write_only=True)
    email = serializers.EmailField(required=False, default='', write_only=True)

    class Meta:
        model = Quotation
        fields = ['service', 'project_type', 'budget_range', 'area_sqft', 'floors',
                  'rooms', 'requirements', 'documents', 'images', 'name', 'phone', 'email']

    def create(self, validated_data):
        # Extract guest contact info before model save (not model fields)
        guest_name = validated_data.pop('name', 'Guest')
        guest_phone = validated_data.pop('phone', '')
        guest_email = validated_data.pop('email', '')
        validated_data['status'] = 'submitted'

        # Store guest info in context so perform_create can access it
        self._guest_info = {
            'name': guest_name,
            'phone': guest_phone,
            'email': guest_email,
        }
        return super().create(validated_data)