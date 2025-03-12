from rest_framework import serializers
from .models import Profile, Settings


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            'id',
            'email',
            'name',
            'age',
            'gender',
            'major',
            'profile_picture',
            'hobbies'
        ]
        read_only_fields = ['id', 'email']


class SettingsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    name = serializers.CharField(source="user.name", read_only=True)

    class Meta:
        model = Settings
        fields = [
            "id",
            "email",
            "name",
            "email_notifications",
            "match_notifications",
            "message_notifications",
            "profile_visibility",
            "show_online_status",
            "max_distance",
            "age_min",
            "age_max",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]
