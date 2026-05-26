"""Testimonials views."""
from rest_framework import viewsets
from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True).select_related('project')
    serializer_class = TestimonialSerializer
    filterset_fields = ['rating', 'is_featured', 'project']
    search_fields = ['client_name', 'content']