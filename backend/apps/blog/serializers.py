"""Blog serializers."""
from rest_framework import serializers
from .models import BlogCategory, BlogTag, BlogPost


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'post_count']

    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = ['id', 'name', 'slug']


class BlogPostListSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True, default='')
    tags = BlogTagSerializer(many=True, read_only=True)
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'author_name',
                  'category', 'category_name', 'tags', 'is_featured', 'published_at',
                  'views_count', 'reading_time', 'meta_title', 'meta_description']

    def get_featured_image(self, obj):
        if obj.featured_image:
            url = obj.featured_image.url
            if url.startswith('http'):
                from urllib.parse import urlparse
                url = urlparse(url).path
            return url
        return None


class BlogPostDetailSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    category = BlogCategorySerializer(read_only=True)
    tags = BlogTagSerializer(many=True, read_only=True)
    featured_image = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'featured_image', 'author_name',
                  'category', 'tags', 'is_published', 'is_featured', 'published_at',
                  'meta_title', 'meta_description', 'meta_keywords', 'canonical_url',
                  'views_count', 'reading_time', 'created_at', 'updated_at']

    def get_featured_image(self, obj):
        if obj.featured_image:
            url = obj.featured_image.url
            if url.startswith('http'):
                from urllib.parse import urlparse
                url = urlparse(url).path
            return url
        return None