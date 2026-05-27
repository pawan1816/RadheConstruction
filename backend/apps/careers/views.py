"""Careers views."""
from rest_framework import viewsets, parsers
from rest_framework.permissions import AllowAny, IsAdminUser
from .models import JobApplication
from .serializers import JobApplicationSerializer, JobApplicationCreateSerializer


class JobApplicationViewSet(viewsets.ModelViewSet):
    queryset = JobApplication.objects.all()
    parser_classes = [parsers.MultiPartParser, parsers.JSONParser]

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]

    def get_serializer_class(self):
        if self.action == 'create':
            return JobApplicationCreateSerializer
        return JobApplicationSerializer