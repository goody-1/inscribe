from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, Follow, Notification


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):

    profile_url = serializers.HyperlinkedRelatedField(
        view_name='userprofile-detail',
        read_only=True,
        lookup_field='pk'  # Adjust as needed for the lookup field
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile_url']


class UserProfileSerializer(serializers.ModelSerializer):
    # user = UserSerializer()

    class Meta:
        model = UserProfile
        # fields = ['user', 'firstname', 'lastname', 'bio', 'avatar', 'website']
        fields = ['firstname', 'lastname', 'bio', 'avatar', 'website']
        # read_only_fields = ['user']  # Ensure user field is not modifiable

    def update(self, instance, validated_data):
        # Update only the profile fields, not the user

        instance.firstname = validated_data.get('firstname', instance.firstname)
        instance.lastname = validated_data.get('lastname', instance.lastname)
        instance.bio = validated_data.get('bio', instance.bio)
        if validated_data.get('avatar'):
            instance.avatar = validated_data['avatar']
        instance.website = validated_data.get('website', instance.website)
        instance.save()
        return instance


class UserRetrieveSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(source='userprofile')
    profile_url = serializers.HyperlinkedIdentityField(
        view_name='userprofile-detail',
        read_only=True,
        lookup_field='pk'  # Adjust as needed for the lookup field
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile', 'profile_url']


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed', 'created_at']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'created_at', 'is_read']
