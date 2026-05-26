"""Accounts views — Registration, Login, Profile management."""
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import permission_classes
from django.contrib.auth import authenticate
from .models import User, EngineerProfile
from .serializers import (
    UserSerializer, RegisterSerializer, LoginSerializer,
    ChangePasswordSerializer, EngineerProfileSerializer,
)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    """Register a new user."""
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    refresh = RefreshToken.for_user(user)
    return Response({
        'success': True,
        'message': 'Registration successful!',
        'data': {
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Login user and return JWT tokens."""
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    refresh = RefreshToken.for_user(user)
    return Response({
        'success': True,
        'data': {
            'user': UserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }
    })


@api_view(['GET', 'PUT', 'PATCH'])
def profile_view(request):
    """Get or update current user profile."""
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response({'success': True, 'data': serializer.data})

    serializer = UserSerializer(request.user, data=request.data, partial=request.method == 'PATCH')
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({'success': True, 'data': serializer.data})


@api_view(['POST'])
def change_password_view(request):
    """Change user password."""
    serializer = ChangePasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = request.user
    if not user.check_password(serializer.validated_data['old_password']):
        return Response({'error': 'Invalid old password.'}, status=status.HTTP_400_BAD_REQUEST)
    user.set_password(serializer.validated_data['new_password'])
    user.save()
    return Response({'success': True, 'message': 'Password changed successfully.'})


class UserViewSet(viewsets.ModelViewSet):
    """Admin user management."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ['role', 'is_active']
    search_fields = ['email', 'first_name', 'last_name', 'phone']

    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        user = self.get_object()
        user.is_active = not user.is_active
        user.save()
        return Response({'success': True, 'is_active': user.is_active})