from django.contrib.auth.models import User
from django.utils.timesince import timesince
from django.contrib.humanize.templatetags.humanize import naturaltime
from django.utils.timezone import now
from rest_framework import serializers
from .models import Article, Comment, Like, Tag, ArticleTag, Bookmark

from users.serializers import UserRetrieveSerializer


class ArticleSerializer(serializers.ModelSerializer):

    # Create a link to the article detail view
    article_url = serializers.HyperlinkedIdentityField (
        view_name='article-detail',  # Replace with your actual view name
        lookup_field='pk'  # This will use the article's primary key in the URL
    )
    author_profile = UserRetrieveSerializer(source='author', read_only=True)

    # Field to get the number of comments on the article
    comment_count = serializers.SerializerMethodField()

    # Humanized time field for creation time
    humanized_created_at = serializers.SerializerMethodField()
    humanized_updated_at = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'content',
                  'author', 'author_profile', 'article_url', 'created_at', 'updated_at',
                  'humanized_created_at', 'humanized_updated_at', 'published', 'comment_count']
        read_only_fields = ['author', 'author_username', 'created_at', 'updated_at']

    def get_humanized_created_at(self, obj):
        return self._humanize_time(obj.created_at)

    def get_humanized_updated_at(self, obj):
        # You can use either timesince or naturaltime
        return self._humanize_time(obj.updated_at)

    def get_comment_count(self, obj):
        # Count the number of comments related to the article
        return Comment.objects.filter(article=obj).count()

    def _humanize_time(self, timestamp):
        # Calculate the time difference
        time_diff = timesince(timestamp, now())
        # Split the string to get only the largest time unit (e.g., days, weeks, months)
        # and ignore the rest (hours, minutes)
        humanized = time_diff.split(',')[0]  # Take the first part before the comma
        return humanized + " ago"


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    humanized_created_at = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'article', 'author_id', 'author_username', 'content', 'created_at',
                  'humanized_created_at']
        read_only_fields = ['id', 'article', 'author_id', 'author_username', 'created_at']

    def get_humanized_created_at(self, obj):
        return self._humanize_time(obj.created_at)

    def _humanize_time(self, timestamp):
        # Calculate the time difference
        time_diff = timesince(timestamp, now())
        # Split the string to get only the largest time unit (e.g., days, weeks, months)
        # and ignore the rest (hours, minutes)
        humanized = time_diff.split(',')[0]  # Take the first part before the comma
        return humanized + " ago"

    def validate_content(self, value):
        if not value.strip():
            raise serializers.ValidationError("Comment content cannot be empty.")
        return value



class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'article', 'comment', 'created_at']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'slug']


class ArticleTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticleTag
        fields = ['id', 'article', 'tag']


class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'article', 'created_at']
