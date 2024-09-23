from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# from users.models import UserProfile


class Article(models.Model):
    """Article Model (Stores Articles)"""

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
            original_slug = self.slug
            count = 1
            # Check for slug conflicts
            while Article.objects.filter(slug=self.slug).exists():
                count += 1
                self.slug = f'{original_slug}-{count}'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    """Comment Model (Stores Comments on Articles)"""

    article = models.ForeignKey(Article, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.article.title}'


class Like(models.Model):
    """"Like Model (Tracks Likes on Articles and Comments)"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, related_name='likes', null=True, blank=True, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, related_name='likes', null=True, blank=True, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.article:
            return f'{self.user.username} liked {self.article.title}'
        return f'{self.user.username} liked a comment'


class Tag(models.Model):
    """"Tag Model (Stores Tags for Articles)"""

    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


class ArticleTag(models.Model):
    """"Article-Tag Relationship Model
    (Many-to-Many Relationship between Articles and Tags)"""

    article = models.ForeignKey(Article, related_name='article_tags', on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, related_name='tagged_articles', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.article.title} tagged with {self.tag.name}'


class Bookmark(models.Model):
    """"Bookmark Model (Tracks User Bookmarked Articles)"""

    user = models.ForeignKey(User, related_name='bookmarks', on_delete=models.CASCADE)
    article = models.ForeignKey(Article, related_name='bookmarked_by', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} bookmarked {self.article.title}'
