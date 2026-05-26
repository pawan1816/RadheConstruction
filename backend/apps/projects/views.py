"""Projects views."""
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ProjectCategory, Project, ProjectImage, ProjectProgress
from .serializers import (
    ProjectCategorySerializer, ProjectListSerializer, ProjectDetailSerializer,
    ProjectImageSerializer, ProjectProgressSerializer,
)


class ProjectCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProjectCategory.objects.all()
    serializer_class = ProjectCategorySerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_active=True).select_related('category', 'engineer').prefetch_related('images')
    filterset_fields = ['category', 'status', 'city', 'is_featured', 'engineer']
    search_fields = ['title', 'location', 'description']
    ordering_fields = ['created_at', 'completion_percentage']

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectListSerializer
        return ProjectDetailSerializer

    @action(detail=True, methods=['get'])
    def progress(self, request, pk=None):
        project = self.get_object()
        updates = project.progress_updates.all()
        serializer = ProjectProgressSerializer(updates, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        project = self.get_object()
        images = project.images.all()
        serializer = ProjectImageSerializer(images, many=True)
        return Response(serializer.data)