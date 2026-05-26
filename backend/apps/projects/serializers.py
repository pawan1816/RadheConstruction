"""Projects serializers."""
from rest_framework import serializers
from .models import ProjectCategory, Project, ProjectImage, ProjectProgress


class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = ['id', 'name', 'slug', 'description']


class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'caption', 'image_type', 'sort_order']


class ProjectProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectProgress
        fields = ['id', 'title', 'description', 'date', 'image', 'percentage']


class ProjectListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True, default='')
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'category', 'category_name', 'location', 'city',
                  'area_sqft', 'budget_range', 'status', 'completion_percentage', 'is_featured',
                  'thumbnail', 'created_at']

    def get_thumbnail(self, obj):
        first_img = obj.images.filter(image_type='gallery').first()
        if first_img:
            return first_img.image.url if first_img.image else None
        return None


class ProjectDetailSerializer(serializers.ModelSerializer):
    category = ProjectCategorySerializer(read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)
    progress_updates = ProjectProgressSerializer(many=True, read_only=True)
    engineer_name = serializers.CharField(source='engineer.get_full_name', read_only=True, default='')

    class Meta:
        model = Project
        fields = ['id', 'category', 'title', 'slug', 'client', 'engineer', 'engineer_name',
                  'location', 'city', 'state', 'area_sqft', 'budget_range', 'description',
                  'features', 'status', 'start_date', 'end_date', 'completion_percentage',
                  'is_featured', 'is_active', 'meta_title', 'meta_description',
                  'images', 'progress_updates', 'created_at', 'updated_at']