from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Article, Comment, Like, Tag, ArticleTag, Bookmark
from .serializers import ArticleSerializer, CommentSerializer, LikeSerializer
from .serializers import TagSerializer, ArticleTagSerializer, BookmarkSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Set the author to the logged-in user
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        Filter comments by article using the nested article lookup.
        """
        article_id = self.kwargs['article_pk']  # article_pk is the lookup set in the nested router
        return Comment.objects.filter(article__id=article_id)

    def perform_create(self, serializer):
        """
        Set the logged-in user as the author of the comment
        and associate it with the article.
        """
        article_id = self.kwargs['article_pk']
        article = get_object_or_404(Article, id=article_id)
        serializer.save(author=self.request.user, article=article)


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class ArticleTagViewSet(viewsets.ModelViewSet):
    queryset = ArticleTag.objects.all()
    serializer_class = ArticleTagSerializer


class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
