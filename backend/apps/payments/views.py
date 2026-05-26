"""Payments views."""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Payment
from .serializers import PaymentSerializer, PaymentCreateSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.select_related('user', 'booking', 'quotation').all()
    filterset_fields = ['user', 'status', 'payment_method', 'booking', 'quotation']
    search_fields = ['invoice_number', 'transaction_id']
    ordering_fields = ['created_at', 'amount']

    def get_serializer_class(self):
        if self.action == 'create':
            return PaymentCreateSerializer
        return PaymentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ('admin', 'staff'):
            return self.queryset
        return self.queryset.filter(user=user)

    @action(detail=True, methods=['post'])
    def verify(self, request, pk=None):
        payment = self.get_object()
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        if razorpay_payment_id:
            payment.razorpay_payment_id = razorpay_payment_id
            payment.status = 'completed'
            payment.save()
            return Response({'success': True, 'message': 'Payment verified successfully.'})
        return Response({'error': 'Payment ID required.'}, status=status.HTTP_400_BAD_REQUEST)