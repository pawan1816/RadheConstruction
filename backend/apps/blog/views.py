"""Blog views."""
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import BlogCategory, BlogTag, BlogPost
from .serializers import BlogCategorySerializer, BlogTagSerializer, BlogPostListSerializer, BlogPostDetailSerializer


class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogTagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True).select_related('author', 'category').prefetch_related('tags')
    filterset_fields = ['category', 'tags', 'is_featured', 'author']
    search_fields = ['title', 'excerpt', 'content']
    ordering_fields = ['published_at', 'views_count']
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        posts = self.queryset.filter(is_featured=True)[:5]
        serializer = BlogPostListSerializer(posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recent(self, request):
        posts = self.queryset.order_by('-published_at')[:6]
        serializer = BlogPostListSerializer(posts, many=True)
        return Response(serializer.data)