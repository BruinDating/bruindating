import { profileDataProps, UserData, MatchData, Message } from "@/types/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Mock token - keep consistent with AuthContext
const MOCK_ACCESS_TOKEN = "dev_mock_access_token_for_testing";

// Check if using mock authentication
const isUsingMockAuth = (token: string | null): boolean => {
  return process.env.NODE_ENV === 'development' && token === MOCK_ACCESS_TOKEN;
};

// Mock data - potential matches
const MOCK_POTENTIAL_MATCHES: MatchData[] = [
  {
    id: 101,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@g.ucla.edu",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Computer Science major who loves hiking and photography.",
    age: 20,
    major: "Computer Science",
    year: "Junior",
    interests: ["Hiking", "Photography", "Coding"],
    photos: ["https://randomuser.me/api/portraits/women/1.jpg"],
    matchPercentage: 92,
    lastActive: "2023-05-01T14:30:00Z",
    dpAgeRange: [18, 25],
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
  },
  {
    id: 102,
    name: "Mike Johnson",
    username: "mikej",
    email: "mike@g.ucla.edu",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "Engineering student passionate about robotics and AI.",
    age: 22,
    major: "Engineering",
    year: "Senior",
    interests: ["Robotics", "AI", "Basketball"],
    photos: ["https://randomuser.me/api/portraits/men/2.jpg"],
    matchPercentage: 85,
    lastActive: "2023-05-02T09:15:00Z",
    dpAgeRange: [18, 30],
    dpDistance: 40,
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
  },
  {
    id: 103,
    name: "Sarah Lee",
    username: "sarahlee",
    email: "sarah@g.ucla.edu",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    bio: "Psychology student interested in cognitive development and neuroscience.",
    age: 21,
    major: "Psychology",
    year: "Junior",
    interests: ["Psychology", "Reading", "Yoga"],
    photos: ["https://randomuser.me/api/portraits/women/3.jpg"],
    matchPercentage: 78,
    lastActive: "2023-05-03T16:45:00Z",
    dpAgeRange: [20, 25],
    dpDistance: 30,
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
  }
];

// Mock data - current matches
const MOCK_CURRENT_MATCHES: MatchData[] = [
  {
    id: 201,
    name: "Alex Rivera",
    username: "alexr",
    email: "alex@g.ucla.edu",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    bio: "Business major with a passion for startups and entrepreneurship.",
    age: 23,
    major: "Business",
    year: "Graduate",
    interests: ["Entrepreneurship", "Investing", "Travel"],
    photos: ["https://randomuser.me/api/portraits/men/4.jpg"],
    matchPercentage: 95,
    lastActive: "2023-05-01T18:20:00Z",
    dpAgeRange: [20, 28],
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
  },
  {
    id: 202,
    name: "Emily Chen",
    username: "emilyc",
    email: "emily@g.ucla.edu",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    bio: "Art major who loves painting and drawing. Also interested in graphic design.",
    age: 20,
    major: "Arts",
    year: "Sophomore",
    interests: ["Painting", "Drawing", "Design"],
    photos: ["https://randomuser.me/api/portraits/women/5.jpg"],
    matchPercentage: 88,
    lastActive: "2023-05-02T12:10:00Z",
    dpAgeRange: [18, 23],
    dpDistance: 35,
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
  }
];

// Mock chat messages
const MOCK_CHAT_MESSAGES: Record<string, Message[]> = {
  "chat-101": [
    {
      id: 1,
      text: "Hey there! How's your day going?",
      sender: "alexr",
      timestamp: "2023-05-01T14:30:00Z"
    },
    {
      id: 2,
      text: "Hi! It's going great, just finished my classes. How about you?",
      sender: "dev_user",
      timestamp: "2023-05-01T14:35:00Z"
    },
    {
      id: 3,
      text: "Pretty good! Working on a project for my business class. What are you studying?",
      sender: "alexr",
      timestamp: "2023-05-01T14:40:00Z"
    }
  ],
  "chat-102": [
    {
      id: 4,
      text: "Hello! I saw we both like art. What's your favorite medium?",
      sender: "emilyc",
      timestamp: "2023-05-02T10:15:00Z"
    },
    {
      id: 5,
      text: "Hi Emily! I really enjoy digital art, but I've been trying to get better at watercolors lately. How about you?",
      sender: "dev_user",
      timestamp: "2023-05-02T10:20:00Z"
    }
  ]
};

// Mock chat rooms
const MOCK_CHAT_ROOMS = [
  {
    id: "chat-101",
    participants: [
      {
        id: 1,
        username: "dev_user",
        profile_picture: ""
      },
      {
        id: 201,
        username: "alexr",
        name: "Alex Rivera",
        profile_picture: "https://randomuser.me/api/portraits/men/4.jpg"
      }
    ],
    last_message: {
      content: "Pretty good! Working on a project for my business class. What are you studying?",
      timestamp: "2023-05-01T14:40:00Z",
      sender_id: 201
    }
  },
  {
    id: "chat-102",
    participants: [
      {
        id: 1,
        username: "dev_user",
        profile_picture: ""
      },
      {
        id: 202,
        username: "emilyc",
        name: "Emily Chen",
        profile_picture: "https://randomuser.me/api/portraits/women/5.jpg"
      }
    ],
    last_message: {
      content: "Hi Emily! I really enjoy digital art, but I've been trying to get better at watercolors lately. How about you?",
      timestamp: "2023-05-02T10:20:00Z",
      sender_id: 1
    }
  }
];

// Mock data - user profile (default values for development mode)
const DEFAULT_MOCK_USER_PROFILE: profileDataProps = {
  avatar: "https://placehold.co/200",
  username: "dev_user",
  firstName: "Development",
  lastName: "",
  age: 21,
  bio: "This is a mock bio for development testing purposes.",
  major: "Computer Science",
  year: "Junior",
  interests: ["Programming", "Gaming", "Music"],
  photos: [],
  location: "Los Angeles, CA",
  gender: "Not specified",
  genderPreference: [],
  email: "dev@g.ucla.edu",
};

// Check and clean invalid Blob URLs
const cleanStoredData = () => {
  try {
    // Check if avatar is a Blob URL
    const avatar = localStorage.getItem('user_avatar');
    if (avatar && avatar.startsWith('blob:')) {
      localStorage.setItem('user_avatar', DEFAULT_MOCK_USER_PROFILE.avatar);
    }
  } catch (error) {
    // Error handling silently
  }
};

// Clean data on application startup
if (process.env.NODE_ENV === 'development') {
  cleanStoredData();
}

export const fetchProfileData = async ({
  accessToken,
}: {
  accessToken: string | null;
}): Promise<profileDataProps> => {
  try {
    if (!accessToken) {
      throw new Error("No access token found");
    }
    
    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      // 1. First try to get data from fragmented storage
      const username = localStorage.getItem('user_username');
      if (username) {
        try {
          const userData: profileDataProps = {
            username: localStorage.getItem('user_username') || 'dev_user',
            firstName: localStorage.getItem('user_firstName') || 'Development',
            lastName: localStorage.getItem('user_lastName') || '',
            email: localStorage.getItem('user_email') || 'dev@g.ucla.edu',
            bio: localStorage.getItem('user_bio') || '',
            age: Number(localStorage.getItem('user_age')) || 21,
            major: localStorage.getItem('user_major') || '',
            year: localStorage.getItem('user_year') || '',
            location: localStorage.getItem('user_location') || '',
            gender: localStorage.getItem('user_gender') || '',
            interests: [],
            photos: [],
            genderPreference: [],
            avatar: localStorage.getItem('user_avatar') || "https://placehold.co/200"
          };
          
          // Get array-type data
          try {
            const interestsStr = localStorage.getItem('user_interests');
            if (interestsStr) {
              userData.interests = JSON.parse(interestsStr);
            }
          } catch (error) {
            // Silent error handling
          }
          
          try {
            const genderPrefStr = localStorage.getItem('user_genderPreference');
            if (genderPrefStr) {
              userData.genderPreference = JSON.parse(genderPrefStr);
            }
          } catch (error) {
            // Silent error handling
          }
          
          try {
            const photosStr = localStorage.getItem('user_photos');
            if (photosStr) {
              // Photos are now stored directly, no need to resolve references
              const photos = JSON.parse(photosStr);
              
              if (photos && Array.isArray(photos)) {
                userData.photos = photos;
              }
            }
          } catch (error) {
            // Silent error handling
          }
          
          return userData;
        } catch (error) {
          // Silent error handling
        }
      }
      
      // 2. If no data in fragmented storage, try from mockUserProfile
      const savedUserData = localStorage.getItem('mockUserProfile');
      if (savedUserData) {
        try {
          const parsedData = JSON.parse(savedUserData);
          return parsedData;
        } catch (parseError) {
          // Silent error handling
        }
      }
      
      // 3. If none, use default mock data
      return DEFAULT_MOCK_USER_PROFILE;
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

    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      // Get current stored data or use default
      const currentData = localStorage.getItem('mockUserProfile') 
        ? JSON.parse(localStorage.getItem('mockUserProfile') || '{}')
        : DEFAULT_MOCK_USER_PROFILE;
      
      // Merge new data, ensure all fields exist
      const updatedData = {
        ...currentData,
        ...userData,
        // Ensure these key fields are correctly updated even if empty
        avatar: userData.avatar !== undefined ? userData.avatar : currentData.avatar,
        username: userData.username || currentData.username,
        firstName: userData.firstName || currentData.firstName,
        lastName: userData.lastName || currentData.lastName,
        bio: userData.bio !== undefined ? userData.bio : currentData.bio,
        age: userData.age || currentData.age,
        major: userData.major !== undefined ? userData.major : currentData.major,
        year: userData.year !== undefined ? userData.year : currentData.year,
        interests: userData.interests || currentData.interests,
        // Use photos directly without converting to references
        photos: userData.photos || currentData.photos,
        location: userData.location || currentData.location,
        gender: userData.gender || currentData.gender,
        genderPreference: userData.genderPreference || currentData.genderPreference,
        email: userData.email || currentData.email,
      };
      
      // 1. Try to save to localStorage (mockUserProfile)
      try {
        localStorage.setItem('mockUserProfile', JSON.stringify(updatedData));
      } catch (error) {
        // If complete save fails, try without photos
        const minimalData = {...updatedData};
        minimalData.photos = [];
        
        try {
          localStorage.setItem('mockUserProfile', JSON.stringify(minimalData));
        } catch (storageError) {
          throw new Error("Storage limit exceeded, cannot save user profile");
        }
      }
      
      // 2. Also update fragmented storage
      try {
        // Save basic info
        localStorage.setItem('user_username', updatedData.username);
        localStorage.setItem('user_firstName', updatedData.firstName);
        localStorage.setItem('user_lastName', updatedData.lastName);
        localStorage.setItem('user_email', updatedData.email);
        localStorage.setItem('user_avatar', updatedData.avatar);
        localStorage.setItem('user_bio', updatedData.bio || '');
        localStorage.setItem('user_age', String(updatedData.age || 0));
        localStorage.setItem('user_major', updatedData.major || '');
        localStorage.setItem('user_year', updatedData.year || '');
        localStorage.setItem('user_location', updatedData.location || '');
        localStorage.setItem('user_gender', updatedData.gender || '');
        
        // Save array-type data
        if (updatedData.interests && updatedData.interests.length) {
          localStorage.setItem('user_interests', JSON.stringify(updatedData.interests));
        }
        if (updatedData.genderPreference && updatedData.genderPreference.length) {
          localStorage.setItem('user_genderPreference', JSON.stringify(updatedData.genderPreference));
        }
        if (updatedData.photos && updatedData.photos.length) {
          // Store photos directly without conversion to references
          localStorage.setItem('user_photos', JSON.stringify(updatedData.photos));
        }
      } catch (error) {
        // Silent error handling
      }
      
      return updatedData;
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

    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      // Get current stored settings or use default
      const currentSettings = localStorage.getItem('mockUserSettings') 
        ? JSON.parse(localStorage.getItem('mockUserSettings') || '{}')
        : {};
        
      // Merge new settings
      const updatedSettings = {
        ...currentSettings,
        ...settings
      };
      
      // Save to localStorage
      localStorage.setItem('mockUserSettings', JSON.stringify(updatedSettings));
      
      return;
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
    
    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      return MOCK_POTENTIAL_MATCHES;
    }

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
    
    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      return MOCK_CURRENT_MATCHES;
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
    
    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      return MOCK_CHAT_ROOMS;
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
    
    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      return MOCK_CHAT_MESSAGES[roomId] || [];
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
      sender: message.sender_username || message.sender.split('@')[0] || 'unknown',
      timestamp: message.timestamp,
    }));
  } catch (error) {
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
    
    // Check if using mock authentication
    if (isUsingMockAuth(accessToken)) {
      // Return simulated sent message
      const mockMessage: Message = {
        id: Date.now(),
        text: content,
        sender: "dev_user",
        timestamp: new Date().toISOString()
      };
      return mockMessage;
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
      sender: message.sender_username || message.sender.email.split("@")[0] || 'unknown',
      timestamp: message.timestamp,
    };
  } catch (error) {
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
    throw error;
  }
};
