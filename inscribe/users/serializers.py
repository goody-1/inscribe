from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User
from .models import UserProfile, Follow, Notification


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims if needed
        return token

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(request=self.context.get('request'), username=email, password=password)

        if not user:
            raise serializers.ValidationError('Invalid email or password')

        attrs['user'] = user
        return super().validate(attrs)


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
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

    user_profile = serializers.SerializerMethodField()
    profile = UserProfileSerializer(source='userprofile')
    profile_url = serializers.HyperlinkedIdentityField(
        view_name='userprofile-detail',
        read_only=True,
        lookup_field='pk'  # Adjust as needed for the lookup field
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_profile', 'profile', 'profile_url']

    def get_user_profile(self, obj):
        profile = obj.userprofile
        return UserProfileSerializer(profile).data


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'followed', 'created_at']


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'user', 'message', 'created_at', 'is_read']
