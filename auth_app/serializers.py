from rest_framework import serializers
from .models import UCLAUser

class UCLAUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UCLAUser
        fields = ["id", "google_id", "profile_picture", "is_ucla_verified", "email", "username"]
