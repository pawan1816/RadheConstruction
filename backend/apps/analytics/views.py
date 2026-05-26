"""Analytics views."""
from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.db.models import Count, Sum
from .models import AnalyticsEvent, DailyStat
from .serializers import AnalyticsEventSerializer, DailyStatSerializer, DashboardStatsSerializer


class AnalyticsEventViewSet(viewsets.ModelViewSet):
    queryset = AnalyticsEvent.objects.all()
    serializer_class = AnalyticsEventSerializer
    filterset_fields = ['event_type', 'user']
    search_fields = ['event_type', 'page_url']


class DailyStatViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DailyStat.objects.all()
    serializer_class = DailyStatSerializer


@api_view(['GET'])
def dashboard_stats(request):
    """Get aggregated dashboard statistics."""
    from apps.projects.models import Project
    from apps.leads.models import Lead
    from apps.bookings.models import Booking
    from apps.quotations.models import Quotation
    from apps.payments.models import Payment
    from apps.testimonials.models import Testimonial
    from apps.accounts.models import User

    stats = {
        'total_projects': Project.objects.count(),
        'completed_projects': Project.objects.filter(status='completed').count(),
        'ongoing_projects': Project.objects.filter(status='ongoing').count(),
        'total_leads': Lead.objects.count(),
        'total_bookings': Booking.objects.count(),
        'total_quotations': Quotation.objects.count(),
        'total_revenue': Payment.objects.filter(status='completed').aggregate(total=Sum('amount'))['total'] or 0,
        'total_users': User.objects.count(),
        'total_testimonials': Testimonial.objects.filter(is_active=True).count(),
    }
    serializer = DashboardStatsSerializer(stats)
    return Response({'success': True, 'data': serializer.data})