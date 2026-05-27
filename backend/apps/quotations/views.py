"""Quotations views."""
from rest_framework import viewsets, status
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Quotation, QuotationItem
from .serializers import QuotationSerializer, QuotationCreateSerializer, QuotationItemSerializer


class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.select_related('user', 'service').prefetch_related('items').all()
    filterset_fields = ['user', 'service', 'status']
    search_fields = ['project_type', 'requirements']
    ordering_fields = ['created_at']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.action == 'create':
            return QuotationCreateSerializer
        return QuotationSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return Quotation.objects.none()
        if user.role in ('admin', 'staff'):
            return self.queryset
        return self.queryset.filter(user=user)

    def perform_create(self, serializer):
        """Handle both authenticated and guest submissions."""
        user = self.request.user
        quotation = serializer.save(
            user=user if user.is_authenticated else self._get_admin_user()
        )

        # Create a CRM lead from guest info if present
        guest_info = getattr(serializer, '_guest_info', None)
        if guest_info:
            try:
                from apps.leads.models import Lead
                Lead.objects.create(
                    name=guest_info.get('name', 'Guest') or 'Guest',
                    email=guest_info.get('email', ''),
                    phone=guest_info.get('phone', ''),
                    source='website',
                    service_interest=quotation.project_type or '',
                    budget_range=quotation.budget_range or '',
                    location='Ranchi',
                    message=(
                        f'Quotation Request #{quotation.id}: '
                        f'{quotation.project_type or "N/A"}, '
                        f'Area: {quotation.area_sqft or "N/A"} sqft, '
                        f'Floors: {quotation.floors or "N/A"}, '
                        f'Requirements: {quotation.requirements or "N/A"}'
                    ),
                    status='new',
                )
            except Exception:
                pass  # Don't fail quotation if lead creation fails

    def _get_admin_user(self):
        from apps.accounts.models import User
        return User.objects.filter(is_superuser=True).first()

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def approve(self, request, pk=None):
        quotation = self.get_object()
        quotation.status = 'approved'
        quotation.admin_notes = request.data.get('admin_notes', quotation.admin_notes)
        quotation.estimated_cost_min = request.data.get('estimated_cost_min', quotation.estimated_cost_min)
        quotation.estimated_cost_max = request.data.get('estimated_cost_max', quotation.estimated_cost_max)
        quotation.save()
        return Response({'success': True, 'message': 'Quotation approved.'})

    @action(detail=True, methods=['post'], permission_classes=[IsAdminUser])
    def reject(self, request, pk=None):
        quotation = self.get_object()
        quotation.status = 'rejected'
        quotation.admin_notes = request.data.get('admin_notes', quotation.admin_notes)
        quotation.save()
        return Response({'success': True, 'message': 'Quotation rejected.'})

    @action(detail=True, methods=['post'], url_path='add-item', permission_classes=[IsAdminUser])
    def add_item(self, request, pk=None):
        quotation = self.get_object()
        serializer = QuotationItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(quotation=quotation)
        return Response({'success': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)