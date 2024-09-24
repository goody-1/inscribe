from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import viewsets, permissions, serializers
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserProfile, Follow, Notification
from .serializers import (
    CustomTokenObtainPairSerializer,
    UserCreateSerializer,
    UserProfileSerializer,
    FollowSerializer,
    NotificationSerializer,
    UserRetrieveSerializer
)


class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Log the validation errors
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    def post(self, request):
        # Get the username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Create JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UserSignupViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = []  # No permission required for listing users

    # Override the retrieve method to use a different serializer
    def get_serializer_class(self):
        if self.action == 'list':
            return UserRetrieveSerializer  # For listing users
        return UserCreateSerializer  # For creating a new user


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        user_id = self.kwargs['user_pk']
        return UserProfile.objects.filter(user_id=user_id)

    # def get_object(self):
    #     # Check if the user is an admin
    #     if self.request.user.is_staff or self.request.user.is_superuser:
    #         # Admin can view any profile via a `user_id` query parameter
    #         user_id = self.kwargs.get('pk')  # Use the 'pk' from the URL if provided
    #         if user_id:
    #             return UserProfile.objects.get(user_id=user_id)
    #         else:
    #             raise serializers.ValidationError("No user ID provided for admin access")
    #     else:
    #         # Non-admin users can only view their own profile
    #         return UserProfile.objects.get(user=self.request.user)

    def perform_create(self, serializer):
        # Ensure the logged-in user is set as the user of the profile
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Only allow the profile owner to update their profile
        if self.request.user != serializer.instance.user:
            raise PermissionDenied("You do not have permission to edit this profile.")
        serializer.save(user=self.request.user)


class FollowViewSet(viewsets.ModelViewSet):
    queryset = Follow.objects.all()
    serializer_class = FollowSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
