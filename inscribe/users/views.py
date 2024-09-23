from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, serializers
from rest_framework.exceptions import PermissionDenied
from .models import UserProfile, Follow, Notification
from .serializers import (
    UserCreateSerializer,
    UserProfileSerializer,
    FollowSerializer,
    NotificationSerializer,
    UserRetrieveSerializer
)


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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        # Allow admins to view all profiles, otherwise show only the profile of the logged-in user
        user = self.request.user
        # if user.is_staff:  # Check if the user is an admin (staff)
        #     return UserProfile.objects.all()
        # else:
        return UserProfile.objects.all()

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
