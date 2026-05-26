"""Quotations views."""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Quotation, QuotationItem
from .serializers import QuotationSerializer, QuotationCreateSerializer, QuotationItemSerializer


class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.select_related('user', 'service').prefetch_related('items').all()
    filterset_fields = ['user', 'service', 'status']
    search_fields = ['project_type', 'requirements']
    ordering_fields = ['created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return QuotationCreateSerializer
        return QuotationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role in ('admin', 'staff'):
            return self.queryset
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        quotation = self.get_object()
        quotation.status = 'approved'
        quotation.admin_notes = request.data.get('admin_notes', quotation.admin_notes)
        quotation.estimated_cost_min = request.data.get('estimated_cost_min', quotation.estimated_cost_min)
        quotation.estimated_cost_max = request.data.get('estimated_cost_max', quotation.estimated_cost_max)
        quotation.save()
        return Response({'success': True, 'message': 'Quotation approved.'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        quotation = self.get_object()
        quotation.status = 'rejected'
        quotation.admin_notes = request.data.get('admin_notes', quotation.admin_notes)
        quotation.save()
        return Response({'success': True, 'message': 'Quotation rejected.'})

    @action(detail=True, methods=['post'], url_path='add-item')
    def add_item(self, request, pk=None):
        quotation = self.get_object()
        serializer = QuotationItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(quotation=quotation)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)