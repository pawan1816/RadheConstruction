"""Core views — Contact, FAQ, Team, Company Info."""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ContactQuery, FAQ, TeamMember, CompanyInfo, SiteSetting
from .serializers import (
    ContactQuerySerializer, FAQSerializer, TeamMemberSerializer,
    CompanyInfoSerializer, SiteSettingSerializer,
)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = FAQSerializer
    queryset = FAQ.objects.filter(is_active=True)


class TeamMemberViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TeamMemberSerializer
    queryset = TeamMember.objects.filter(is_active=True)


class CompanyInfoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CompanyInfoSerializer
    queryset = CompanyInfo.objects.all()

    def list(self, request, *args, **kwargs):
        obj = CompanyInfo.objects.first()
        if not obj:
            return Response({'detail': 'No company info configured.'}, status=404)
        serializer = self.get_serializer(obj)
        return Response(serializer.data)


class SiteSettingViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SiteSettingSerializer
    queryset = SiteSetting.objects.all()


@api_view(['POST'])
def contact_submit(request):
    """Submit a contact query."""
    serializer = ContactQuerySerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'success': True, 'message': 'Thank you for contacting us! We will get back to you soon.', 'data': serializer.data}, status=status.HTTP_201_CREATED)