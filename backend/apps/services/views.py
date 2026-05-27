"""Services views."""
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ServiceCategory, Service, ServiceFAQ
from .serializers import ServiceCategorySerializer, ServiceSerializer, ServiceListSerializer, ServiceFAQSerializer


class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True)
    serializer_class = ServiceCategorySerializer


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.filter(is_active=True).select_related('category')
    lookup_field = 'slug'
    filterset_fields = ['category', 'is_featured']
    search_fields = ['name', 'short_description', 'description']
    ordering_fields = ['sort_order', 'name', 'created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceSerializer

    @action(detail=True, methods=['get'])
    def faqs(self, request, pk=None):
        service = self.get_object()
        faqs = service.faqs.all()
        serializer = ServiceFAQSerializer(faqs, many=True)
        return Response(serializer.data)


class ServiceFAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceFAQ.objects.all()
    serializer_class = ServiceFAQSerializer