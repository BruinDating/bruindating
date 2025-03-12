from django.db import models
from django.utils import timezone  # Add this import
from auth_app.models import UCLAUser

class Profile(models.Model):
    user = models.OneToOneField(UCLAUser, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=50)
    major = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    hobbies = models.TextField()  # Store as comma-separated string

    def __str__(self):
        return f"{self.name}'s Profile"


class Settings(models.Model):
    user = models.OneToOneField(UCLAUser, on_delete=models.CASCADE, related_name="settings")
    email_notifications = models.BooleanField(default=True)
    match_notifications = models.BooleanField(default=True)
    message_notifications = models.BooleanField(default=True)
    profile_visibility = models.CharField(
        max_length=20,
        choices=[
            ("public", "Public"),
            ("matches_only", "Matches Only"),
            ("private", "Private"),
        ],
        default="public",
    )
    show_online_status = models.BooleanField(default=True)
    max_distance = models.IntegerField(default=50)  # in miles
    age_min = models.IntegerField(default=18)
    age_max = models.IntegerField(default=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Settings"
        verbose_name_plural = "Settings"
        indexes = [
            models.Index(fields=["user"]),
        ]

    def __str__(self):
        return f"{self.user.email}'s Settings"
