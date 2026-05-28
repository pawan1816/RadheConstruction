"""Core serializers."""
from rest_framework import serializers
from .models import ContactQuery, FAQ, TeamMember, CompanyInfo, SiteSetting


class ContactQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactQuery
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'source_page', 'is_resolved', 'created_at']
        read_only_fields = ['id', 'is_resolved', 'created_at']


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', 'category', 'sort_order', 'is_active']


class TeamMemberSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'designation', 'photo', 'bio', 'experience', 'specializations', 'social_links', 'sort_order']

    def get_photo(self, obj):
        if obj.photo:
            url = obj.photo.url
            if url.startswith('http'):
                from urllib.parse import urlparse
                url = urlparse(url).path
            return url
        return None


class CompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyInfo
        fields = '__all__'


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = ['id', 'key', 'value', 'description']