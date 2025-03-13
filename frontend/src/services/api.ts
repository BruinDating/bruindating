import { profileDataProps, UserData, MatchData, Message } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchProfileData = async ({
  accessToken,
}: {
  accessToken: string | null;
}): Promise<profileDataProps> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/profiles/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    const profileData = await response.json();

    const user = profileData?.user || {};

    const email = user?.email || "";
    const username = email
      ? email.split("@")[0]
      : `user_${user?.id || "unknown"}`;

    return {
      avatar: user?.profile_picture || null,
      username: username,
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      age: profileData?.age || 18,
      bio: profileData?.bio || "",
      major: profileData?.major || "",
      year: profileData?.year || "",
      interests: profileData?.interests || [],
      photos: profileData?.photos || [],
      location: profileData?.location || "",
      gender: profileData?.gender || "",
      genderPreference: profileData?.gender_preference || [],
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  userData: Partial<profileDataProps>,
  accessToken: string | null
): Promise<profileDataProps> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/profiles/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bio: userData.bio,
        major: userData.major,
        year: userData.year,
        age: userData.age,
        interests: userData.interests,
        photos: userData.photos,
        location: userData.location,
        gender: userData.gender,
        gender_preference: userData.genderPreference,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.statusText}`);
    }

    return fetchProfileData({ accessToken });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const updateUserSettings = async (
  settings: Partial<UserData>,
  accessToken: string | null
): Promise<void> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/profiles/settings/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_notifications: settings.notiEmailNotifications,
        match_notifications: settings.notiNewMatches,
        message_notifications: settings.notiMessages,
        profile_visibility: settings.priProfileVisibility,
        show_online_status: settings.priShowOnlineStatus,
        max_distance: settings.dpDistance,
        age_min: settings.dpAgeRange?.[0],
        age_max: settings.dpAgeRange?.[1],
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update settings: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
};

export const fetchPotentialMatches = async (
  accessToken: string | null
): Promise<MatchData[]> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }
    // this line below can cause no users to pop up if we don't have a lot of users in database, 
    //if we want everyone can match with each other, then we should change
    const response = await fetch(`${API_URL}/matching/potential/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch potential matches: ${response.statusText}`
      );
    }

    const data = await response.json();
    const filteredData = data.filter((match: any) => match?.email);

    return filteredData.map((match: any) => {
      const email = match?.email || "";
      const username = email
        ? email.split("@")[0]
        : `user_${match?.id || "unknown"}`;

      return {
        id: match?.id || 0,
        name:
          match?.first_name && match?.last_name
            ? `${match.first_name} ${match.last_name}`
            : "Unknown User",
        username,
        email: email,
        avatar: match?.profile_picture || null,
        bio: match?.profile?.bio || "",
        age: match?.profile?.age || 18,
        major: match?.profile?.major || "",
        year: match?.profile?.year || "",
        interests: match?.profile?.interests || [],
        photos: match?.profile?.photos || [],
        matchPercentage: match?.profile?.match_percentage || 0,
        lastActive: match?.profile?.last_active || "",
        dpAgeRange: [18, 100],
        dpDistance: 50,
        dpShowMe: "all",
        dpInterests: [],
        dpMajors: [],
        notiNewMatches: true,
        notiMessages: true,
        notiAppUpdates: true,
        notiEmailNotifications: true,
        priProfileVisibility: "public",
        priShowOnlineStatus: true,
        priShowLastActive: true,
        priAllowTagging: true,
      };
    });
  } catch (error) {
    console.error("Error fetching potential matches:", error);
    throw error;
  }
};

export const fetchCurrentMatches = async (
  accessToken: string | null
): Promise<MatchData[]> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/matching/matches/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch current matches: ${response.statusText}`
      );
    }

    const data = await response.json();
    const filteredData = data.filter((match: any) => match?.email);

    return filteredData.map((match: any) => {
      const email = match?.email || "";
      const username = email
        ? email.split("@")[0]
        : `user_${match?.id || "unknown"}`;

      return {
        id: match?.id || 0,
        name:
          match?.first_name && match?.last_name
            ? `${match.first_name} ${match.last_name}`
            : "Unknown User",
        username,
        email: email,
        avatar: match?.profile_picture || null,
        bio: match?.profile?.bio || "",
        age: match?.profile?.age || 18,
        major: match?.profile?.major || "",
        year: match?.profile?.year || "",
        interests: match?.profile?.interests || [],
        photos: match?.profile?.photos || [],
        matchPercentage: match?.profile?.match_percentage || 0,
        lastActive: match?.profile?.last_active || "",
        dpAgeRange: [18, 100],
        dpDistance: 50,
        dpShowMe: "all",
        dpInterests: [],
        dpMajors: [],
        notiNewMatches: true,
        notiMessages: true,
        notiAppUpdates: true,
        notiEmailNotifications: true,
        priProfileVisibility: "public",
        priShowOnlineStatus: true,
        priShowLastActive: true,
        priAllowTagging: true,
      };
    });
  } catch (error) {
    console.error("Error fetching current matches:", error);
    throw error;
  }
};

export const likeProfile = async (
  userId: string,
  accessToken: string | null
): Promise<void> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${API_URL}/matching/matches/${userId}/like/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to like profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error liking profile:", error);
    throw error;
  }
};

export const dislikeProfile = async (
  userId: string,
  accessToken: string | null
): Promise<void> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${API_URL}/matching/matches/${userId}/dislike/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to dislike profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error disliking profile:", error);
    throw error;
  }
};

export const superLikeProfile = async (
  userId: string,
  accessToken: string | null
): Promise<void> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${API_URL}/matching/matches/${userId}/superlike/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to super like profile: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error super liking profile:", error);
    throw error;
  }
};

export const fetchChatRooms = async (
  accessToken: string | null
): Promise<any[]> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/chat/rooms/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chat rooms: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching chat rooms:", error);
    throw error;
  }
};

export const fetchChatMessages = async (
  roomId: string,
  accessToken: string | null
): Promise<Message[]> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/chat/rooms/${roomId}/messages/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch chat messages: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((message: any) => ({
      id: message.id,
      text: message.content,
      sender: message.sender.email.split("@")[0],
      timestamp: new Date(message.timestamp).toLocaleString(),
    }));
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};

export const sendChatMessage = async (
  roomId: string,
  content: string,
  accessToken: string | null
): Promise<Message> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/chat/rooms/${roomId}/messages/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    const message = await response.json();
    return {
      id: message.id,
      text: message.content,
      sender: message.sender.email.split("@")[0],
      timestamp: new Date(message.timestamp).toLocaleString(),
    };
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

export const createChatRoom = async (
  participantId: string,
  accessToken: string | null
): Promise<string> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/chat/rooms/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ participant_id: participantId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create chat room: ${response.statusText}`);
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error("Error creating chat room:", error);
    throw error;
  }
};

export const submitQuestionnaire = async (
  answers: Record<string, any>,
  accessToken: string | null
): Promise<void> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_URL}/profiles/questionnaire/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit questionnaire: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error submitting questionnaire:", error);
    throw error;
  }
};
