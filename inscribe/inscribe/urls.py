"""
URL configuration for inscribe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from users.views import (
    UserProfileViewSet, FollowViewSet, NotificationViewSet, UserSignupViewSet,
    RegisterUserView, LoginUserView, CustomTokenObtainPairView
    )
from articles.views import ArticleViewSet, CommentViewSet, TagViewSet, LikeViewSet
from articles.views import ArticleTagViewSet, BookmarkViewSet


schema_view = get_schema_view(
    openapi.Info(
        title="Your API",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@yourapi.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'users', UserSignupViewSet, basename='user')
router.register(r'profile', UserProfileViewSet, basename='userprofile')

user_profile_router = routers.NestedDefaultRouter(router, r'users', lookup='user')
user_profile_router.register(r'profile', UserProfileViewSet, basename='user-profile')
router.register(r'followers', FollowViewSet)
router.register(r'notifications', NotificationViewSet)

router.register(r'articles', ArticleViewSet, basename='article')
# Create a nested router for comments under articles
articles_router = routers.NestedDefaultRouter(router, r'articles', lookup='article')
articles_router.register(r'comments', CommentViewSet, basename='article-comments')

router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'tags', TagViewSet)
router.register(r'article-tags', ArticleTagViewSet)
router.register(r'bookmarks', BookmarkViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/', include(articles_router.urls)),
    path('api/', include(user_profile_router.urls)),

    path('api-auth/', include('rest_framework.urls')),
    path('api/login/', LoginUserView.as_view(), name='login_user'),
    path('api/register/', RegisterUserView.as_view(), name='register_user'),

    # will use CustomTokenObtainPairView to override the default TokenObtainPairView
    # this is to allow signup with email instead of username or both
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
