from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.views import (
    UserProfileViewSet, FollowViewSet, NotificationViewSet,
    UserSignupViewSet,
)
from .views import RegisterUserView


router = DefaultRouter()
router.register(r'users', UserSignupViewSet, basename='user')  # List all users and user signup
router.register(r'profile', UserProfileViewSet, basename='userprofile')  # Profile update
router.register(r'follows', FollowViewSet)
router.register(r'notifications', NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterUserView.as_view(), name='register_user'),
]
