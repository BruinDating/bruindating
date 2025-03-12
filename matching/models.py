from django.db import models
from django.utils import timezone
from auth_app.models import UCLAUser
from profiles.models import Profile



class Swipe(models.Model):
    LIKE = 'like'
    DISLIKE = 'dislike'
    SWIPE_CHOICES = [
        (LIKE, 'Like'),
        (DISLIKE, 'Dislike'),
    ]

    swiper = models.ForeignKey(UCLAUser, on_delete=models.CASCADE, related_name='swipes_made')
    swiped = models.ForeignKey(UCLAUser, on_delete=models.CASCADE, related_name='swipes_received')
    action = models.CharField(max_length=7, choices=SWIPE_CHOICES)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('swiper', 'swiped')  # Prevent duplicate swipes

class Match(models.Model):
    user = models.OneToOneField(UCLAUser, on_delete=models.CASCADE, related_name='match_profile')
    matched = models.ManyToManyField(UCLAUser, related_name='matched_with', blank=True)
    approved = models.ManyToManyField(UCLAUser, related_name='approved_by', blank=True)
    rejected = models.ManyToManyField(UCLAUser, related_name='rejected_by', blank=True)
    super_liked = models.ManyToManyField(UCLAUser, related_name='super_liked_by', blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Match profile for {self.user.email}"
