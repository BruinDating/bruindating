from rest_framework import serializers
from .models import Match
from auth_app.models import UCLAUser
from profiles.serializers import ProfileSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UCLAUser
        fields = ["id", "email", "name"]


class MatchSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source="user", read_only=True)
    approved_details = UserSerializer(source="approved", many=True, read_only=True)
    rejected_details = UserSerializer(source="rejected", many=True, read_only=True)
    super_liked_details = UserSerializer(source="super_liked", many=True, read_only=True)
    matched_details = UserSerializer(source="matched", many=True, read_only=True)

    class Meta:
        model = Match
        fields = [
            "id",
            "user",
            "user_details",
            "approved",
            "approved_details",
            "rejected",
            "rejected_details",
            "super_liked",
            "super_liked_details",
            "matched",
            "matched_details",
        ]
        read_only_fields = ["id"]


class PotentialMatchSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = UCLAUser
        fields = ["id", "email", "name", "profile"]
