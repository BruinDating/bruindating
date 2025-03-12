from django.core.management.base import BaseCommand
from profiles.models import Profile
from auth_app.models import UCLAUser

MOCK_USERS = [
    {"name": "Alice", "bio": "Lover of coffee and sunsets.", "major": "Computer Science", "year": "Senior", "interests": ["Indie", "Rock", "Jazz"], "gender": "Female", "location": "UCLA"},
    {"name": "Bob", "bio": "Tech enthusiast & gamer.", "major": "Electrical Engineering", "year": "Junior", "interests": ["Hip-hop", "EDM", "Classical"], "gender": "Male", "location": "UCLA"},
]

class Command(BaseCommand):
    help = "Seed database with mock users"

    def handle(self, *args, **kwargs):
        # Ensure Jason's user exists, but don't duplicate
        jason_user, _ = UCLAUser.objects.get_or_create(
            email="jasonvu@ucla.edu",
            defaults={"username": "jasonvu"}
        )

        for user_data in MOCK_USERS:
            user, _ = UCLAUser.objects.get_or_create(
                email=f"{user_data['name'].lower()}@ucla.edu",
                defaults={"username": user_data['name'].lower()}
            )

            # Avoid duplicate profiles
            profile, created = Profile.objects.get_or_create(
                user=user,
                defaults=user_data
            )

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
