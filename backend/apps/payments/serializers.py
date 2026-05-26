"""Payments serializers."""
from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'user', 'user_name', 'booking', 'quotation', 'amount', 'currency',
                  'payment_method', 'transaction_id', 'razorpay_order_id', 'razorpay_payment_id',
                  'status', 'invoice_number', 'gst_amount', 'gst_percentage', 'created_at']
        read_only_fields = ['id', 'user', 'transaction_id', 'status', 'invoice_number', 'created_at']


class PaymentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['booking', 'quotation', 'amount', 'payment_method']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        import uuid
        validated_data['invoice_number'] = f'INV-{uuid.uuid4().hex[:8].upper()}'
        return super().create(validated_data)