from django.db import models
from auth_app.models import UCLAUser


class Match(models.Model):

    user = models.OneToOneField(UCLAUser, on_delete=models.CASCADE, related_name="match_profile")
    approved = models.ManyToManyField(UCLAUser, related_name="approved_by", blank=True)
    rejected = models.ManyToManyField(UCLAUser, related_name="rejected_by", blank=True)
    super_liked = models.ManyToManyField(UCLAUser, related_name="super_liked_by", blank=True)
    matched = models.ManyToManyField(UCLAUser, related_name="matched_with", blank=True)

    class Meta:
        indexes = [
            models.Index(fields=["user"]),
        ]

    def __str__(self):
        return f"Match profile for {self.user.email}"
