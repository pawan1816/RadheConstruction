"""Accounts serializers."""
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, EngineerProfile


class EngineerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerProfile
        fields = ['id', 'specialization', 'experience_years', 'certifications', 'projects_completed', 'rating', 'bio', 'availability']


class UserSerializer(serializers.ModelSerializer):
    engineer_profile = EngineerProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'role',
                  'avatar', 'address', 'city', 'state', 'pincode', 'is_verified',
                  'company_name', 'gst_number', 'engineer_profile']
        read_only_fields = ['id', 'is_verified']


class UserMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'role', 'avatar']

    name = serializers.SerializerMethodField()

    def get_name(self, obj):
        return obj.get_full_name() or obj.username


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'phone', 'password', 'role']
        extra_kwargs = {'role': {'default': 'customer'}}

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['email'], password=data['password'])
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Invalid credentials')


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField(min_length=8)