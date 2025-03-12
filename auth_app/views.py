from django.shortcuts import redirect
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login, logout
import requests
import google_auth_oauthlib.flow
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.http import JsonResponse

UCLA_EMAIL_DOMAINS = ["@ucla.edu", "@g.ucla.edu"]

# Mock user data for now
MOCK_USERS = [
    {
        "id": 1,
        "name": "Alice",
        "age": 24,
        "bio": "Lover of coffee and sunsets.",
        "interests": ["Indie", "Rock", "Jazz"],
        "profile_picture": "https://placehold.co/400",
    },
    {
        "id": 2,
        "name": "Bob",
        "age": 26,
        "bio": "Tech enthusiast & gamer.",
        "interests": ["Hip-hop", "EDM", "Classical"],
        "profile_picture": "https://placehold.co/400",
    },
    {
        "id": 3,
        "name": "Charlie",
        "age": 22,
        "bio": "Explorer, foodie, and bookworm.",
        "interests": ["Pop", "R&B", "Reggae"],
        "profile_picture": "https://placehold.co/400",
    },
]

USER_LIKES = {}  # Temporary dictionary to store likes
USER_DISLIKES = {}  # Temporary dictionary to store dislikes

# --- EXISTING AUTH VIEWS (KEEP AS IS) ---

@api_view(["GET"])
#@permission_classes([IsAuthenticated])
def get_users_to_swipe(request):
    """Fetch mock users for swiping"""
    return Response(MOCK_USERS)

@api_view(["POST"])
#@permission_classes([IsAuthenticated])
def swipe_action(request):
    """
    Handle user swiping action.
    Expecting {"user_id": 1, "action": "like"} in request data.
    """
    user = request.user
    user_id = request.data.get("user_id")
    action = request.data.get("action")

    if not user_id or action not in ["like", "dislike"]:
        return Response({"error": "Invalid request"}, status=400)

    if action == "like":
        if user.username not in USER_LIKES:
            USER_LIKES[user.username] = set()
        USER_LIKES[user.username].add(user_id)
    else:
        if user.username not in USER_DISLIKES:
            USER_DISLIKES[user.username] = set()
        USER_DISLIKES[user.username].add(user_id)

    return Response({"message": f"{action.capitalize()} recorded for user {user_id}."})

@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_matches(request):
    """Return a mock list of matched users"""
    return Response([
        {
            "id": 5,
            "name": "Emily",
            "age": 23,
            "bio": "Nature lover and adventure seeker.",
            "interests": ["Hiking", "Photography", "Travel"],
            "profile_picture": "https://placehold.co/400",
        },
        {
            "id": 6,
            "name": "David",
            "age": 25,
            "bio": "Passionate about tech and startups.",
            "interests": ["Tech", "Startups", "Investing"],
            "profile_picture": "https://placehold.co/400",
        },
    ])


@csrf_exempt
@api_view(["POST"])
def google_login(request):
    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        settings.GOOGLE_OAUTH_CLIENT_SECRETS_FILE,
        scopes=["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"],
    )

    redirect_uri = f"{settings.BACKEND_URL}/auth/callback"
    flow.redirect_uri = redirect_uri

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="select_account",
    )

    request.session["oauth_state"] = state

    return JsonResponse({"auth_url": authorization_url})


@csrf_exempt
def google_callback(request):
    if "error" in request.GET:
        return JsonResponse({"error": request.GET.get("error")}, status=400)

    code = request.GET.get("code")
    state = request.GET.get("state")

    stored_state = request.session.get("oauth_state")
    if not stored_state or state != stored_state:
        return JsonResponse({"error": "Invalid state parameter"}, status=400)

    flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
        settings.GOOGLE_OAUTH_CLIENT_SECRETS_FILE,
        scopes=["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid"],
        state=state,
    )

    redirect_uri = f"{settings.BACKEND_URL}/auth/callback"
    flow.redirect_uri = redirect_uri

    flow.fetch_token(code=code)

    credentials = flow.credentials

    userinfo_endpoint = "https://www.googleapis.com/oauth2/v3/userinfo"
    headers = {"Authorization": f"Bearer {credentials.token}"}

    userinfo_response = requests.get(userinfo_endpoint, headers=headers)

    if userinfo_response.status_code != 200:
        return JsonResponse({"error": "Failed to obtain user info"}, status=400)

    user_data = userinfo_response.json()

    email = user_data.get("email", "")
    is_ucla_email = any(domain in email for domain in UCLA_EMAIL_DOMAINS)

    if not is_ucla_email:
        return JsonResponse({"error": "You must use a UCLA email address to sign in", "provided_email": email}, status=403)

    from django.contrib.auth import get_user_model

    User = get_user_model()

    try:
        user = User.objects.get(email=email)
        user.google_id = user_data.get("sub")
        user.profile_picture = user_data.get("picture")
        user.is_ucla_verified = True
        user.save()
    except User.DoesNotExist:
        username = email.split("@")[0]

        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=user_data.get("given_name", ""),
            last_name=user_data.get("family_name", ""),
            google_id=user_data.get("sub"),
            profile_picture=user_data.get("picture"),
            is_ucla_verified=True,
        )

    refresh = RefreshToken.for_user(user)
    tokens = {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

    login(request, user)

    frontend_url = settings.FRONTEND_URL
    return redirect(f"{frontend_url}/auth/callback?access_token={tokens['access']}&refresh_token={tokens['refresh']}&username={user.username}")


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"success": True})


@api_view(["GET"])
@permission_classes([AllowAny])  # ✅ Allow access without authentication
def user_info(request):
    user = request.user

    # Handle AnonymousUser (when not logged in)
    if user.is_anonymous:
        return JsonResponse({"error": "User not authenticated"}, status=401)

    return JsonResponse({
        "email": user.email,
        "username": user.username
    })


@api_view(["POST"])
def token_refresh(request):
    from rest_framework_simplejwt.views import TokenRefreshView

    return TokenRefreshView.as_view()(request)
