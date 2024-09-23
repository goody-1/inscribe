from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, CommentViewSet, LikeViewSet
from .views import TagViewSet, ArticleTagViewSet, BookmarkViewSet


router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'tags', TagViewSet)
router.register(r'article-tags', ArticleTagViewSet)
router.register(r'bookmarks', BookmarkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
