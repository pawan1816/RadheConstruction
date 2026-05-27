"""Quotations views."""
import os
import uuid
from rest_framework import viewsets, status, parsers
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Quotation, QuotationItem
from .serializers import QuotationSerializer, QuotationCreateSerializer, QuotationItemSerializer


class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.select_related('user', 'service').prefetch_related('items').all()
    filterset_fields = ['user', 'service', 'status']
    search_fields = ['project_type', 'requirements']
    ordering_fields = ['created_at']
    parser_classes = [parsers.MultiPartParser, parsers.JSONParser]

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

    def _save_uploads(self, request, quotation):
        """Save uploaded files and attach paths to the quotation."""
        from django.conf import settings
        documents = list(quotation.documents or [])
        images = list(quotation.images or [])

        doc_dir = os.path.join(settings.MEDIA_ROOT, 'quotations', str(quotation.id), 'documents')
        img_dir = os.path.join(settings.MEDIA_ROOT, 'quotations', str(quotation.id), 'images')
        os.makedirs(doc_dir, exist_ok=True)
        os.makedirs(img_dir, exist_ok=True)

        # Handle document files
        doc_files = request.data.getlist('doc_files')
        for f in doc_files:
            ext = os.path.splitext(f.name)[1]
            filename = f'{uuid.uuid4().hex}{ext}'
            path = os.path.join(doc_dir, filename)
            with open(path, 'wb+') as dest:
                for chunk in f.chunks():
                    dest.write(chunk)
            documents.append({
                'name': f.name,
                'path': f'media/quotations/{quotation.id}/documents/{filename}',
                'size': f.size,
            })

        # Handle image files
        img_files = request.data.getlist('img_files')
        for f in img_files:
            ext = os.path.splitext(f.name)[1]
            filename = f'{uuid.uuid4().hex}{ext}'
            path = os.path.join(img_dir, filename)
            with open(path, 'wb+') as dest:
                for chunk in f.chunks():
                    dest.write(chunk)
            images.append({
                'name': f.name,
                'path': f'media/quotations/{quotation.id}/images/{filename}',
                'size': f.size,
            })

        quotation.documents = documents
        quotation.images = images
        quotation.save(update_fields=['documents', 'images'])

    def perform_create(self, serializer):
        """Handle both authenticated and guest submissions."""
        user = self.request.user
        quotation = serializer.save(
            user=user if user.is_authenticated else self._get_admin_user()
        )

        # Save any uploaded files
        self._save_uploads(self.request, quotation)

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
                pass

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