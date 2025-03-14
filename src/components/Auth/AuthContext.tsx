"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  is_ucla_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  updateUser: (userData: Partial<User>, additionalData?: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Default mock user data for development mode
const DEFAULT_MOCK_USER: User = {
  id: 1,
  username: "dev_user",
  email: "dev@g.ucla.edu",
  first_name: "Development",
  last_name: "User",
  profile_picture: null,
  is_ucla_verified: true,
};

// Mock tokens - only for development mode
const MOCK_ACCESS_TOKEN = "dev_mock_access_token_for_testing";
const MOCK_REFRESH_TOKEN = "dev_mock_refresh_token_for_testing";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // Development mode flag - determined by environment variable or current hostname
  const isDevelopment = process.env.NODE_ENV === "development";

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      // If using mock token, set mock user data directly
      if (isDevelopment && accessToken === MOCK_ACCESS_TOKEN) {
        console.log("[DEV MODE] Using mock user data");
        
        // Try to get persisted user data from localStorage (if any)
        let mockUser = DEFAULT_MOCK_USER;
        
        try {
          // Read user data from fragmented storage
          const username = localStorage.getItem('user_username');
          const firstName = localStorage.getItem('user_firstName');
          const lastName = localStorage.getItem('user_lastName');
          const email = localStorage.getItem('user_email');
          const avatar = localStorage.getItem('user_avatar');
          
          if (username || firstName || lastName || email || avatar) {
            // Convert locally stored profile data to User structure needed by AuthContext
            mockUser = {
              ...DEFAULT_MOCK_USER,
              username: username || DEFAULT_MOCK_USER.username,
              email: email || DEFAULT_MOCK_USER.email,
              first_name: firstName || DEFAULT_MOCK_USER.first_name,
              last_name: lastName !== null ? lastName : '',
              profile_picture: avatar || DEFAULT_MOCK_USER.profile_picture,
            };
            
            console.log("[DEV MODE] Using saved user profile data from localStorage");
            console.log("[DEV MODE] Updated mock user:", mockUser);
          }
        } catch (error) {
          console.error("[DEV MODE] Error loading saved user profile:", error);
        }
        
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        const refreshed = await refreshToken();
        if (!refreshed) {
          const isIntentionalLogout =
            localStorage.getItem("intentional_logout") === "true";
          if (isIntentionalLogout) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");

      // If using mock token in development mode, directly return success
      if (isDevelopment && refreshToken === MOCK_REFRESH_TOKEN) {
        console.log("[DEV MODE] Simulating token refresh");
        return true;
      }

      if (!refreshToken) {
        return false;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/token/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        await getUserInfo();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return false;
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);

      // In development mode, use mock data instead of calling backend
      if (isDevelopment) {
        console.log("[DEV MODE] Using mock login flow");
        
        // Store mock tokens
        localStorage.setItem("access_token", MOCK_ACCESS_TOKEN);
        localStorage.setItem("refresh_token", MOCK_REFRESH_TOKEN);
        
        // Try to get persisted user data from localStorage (if any)
        let mockUser = DEFAULT_MOCK_USER;
        
        try {
          // Read user data from fragmented storage
          const username = localStorage.getItem('user_username');
          const firstName = localStorage.getItem('user_firstName');
          const lastName = localStorage.getItem('user_lastName');
          const email = localStorage.getItem('user_email');
          const avatar = localStorage.getItem('user_avatar');
          
          if (username || firstName || lastName || email || avatar) {
            // Convert locally stored profile data to User structure needed by AuthContext
            mockUser = {
              ...DEFAULT_MOCK_USER,
              username: username || DEFAULT_MOCK_USER.username,
              email: email || DEFAULT_MOCK_USER.email,
              first_name: firstName || DEFAULT_MOCK_USER.first_name,
              last_name: lastName !== null ? lastName : '',
              profile_picture: avatar || DEFAULT_MOCK_USER.profile_picture,
            };
            
            console.log("[DEV MODE] Using saved user profile data from localStorage");
          }
        } catch (error) {
          console.error("[DEV MODE] Error loading saved user profile:", error);
        }
        
        // Set mock user info
        setUser(mockUser);
        setIsAuthenticated(true);
        setIsLoading(false);
        
        // Redirect to home page
        router.push(`/${mockUser.username}/home`);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.auth_url) {
        router.push(data.auth_url);
      } else {
        console.error("Failed to get auth URL");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error initiating login:", error);
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);

      localStorage.setItem("intentional_logout", "true");

      setUser(null);
      setIsAuthenticated(false);

      const accessToken = localStorage.getItem("access_token");
      
      // If not using development mode mock token, try to call backend logout
      if (accessToken && !(isDevelopment && accessToken === MOCK_ACCESS_TOKEN)) {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }).catch((error) => {
          console.error("Error during logout API call:", error);
        });
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      router.replace("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("intentional_logout") === "true") {
        localStorage.removeItem("intentional_logout");
      }
      await getUserInfo();
    };

    checkAuth();

    const refreshInterval = setInterval(() => {
      refreshToken();
    }, 15 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  // Update user data
  const updateUser = (userData: Partial<User>, additionalData?: any) => {
    if (!user) return;
    
    console.log("Update data received by AuthContext:", userData);
    console.log("User data before update in AuthContext:", user);
    
    // Merge new data with existing data
    const updatedUser = { ...user, ...userData };
    console.log("User data after update in AuthContext:", updatedUser);
    
    setUser(updatedUser);
    
    // For development mode, also update data stored in localStorage
    if (isDevelopment) {
      try {
        // 1. First update fragmented storage
        // Update basic user info to fragmented storage
        if (updatedUser.username) {
          localStorage.setItem('user_username', updatedUser.username);
        }
        if (updatedUser.first_name !== undefined) {
          localStorage.setItem('user_firstName', updatedUser.first_name || '');
        }
        if (updatedUser.last_name !== undefined) {
          localStorage.setItem('user_lastName', updatedUser.last_name || '');
        }
        if (updatedUser.email) {
          localStorage.setItem('user_email', updatedUser.email);
        }
        if (updatedUser.profile_picture) {
          localStorage.setItem('user_avatar', updatedUser.profile_picture);
        }
        
        // If additional data provided, update fragmented storage
        if (additionalData) {
          if (additionalData.bio !== undefined) localStorage.setItem('user_bio', additionalData.bio);
          if (additionalData.major !== undefined) localStorage.setItem('user_major', additionalData.major);
          if (additionalData.year !== undefined) localStorage.setItem('user_year', additionalData.year);
          if (additionalData.age !== undefined) localStorage.setItem('user_age', String(additionalData.age));
          if (additionalData.location !== undefined) localStorage.setItem('user_location', additionalData.location);
          if (additionalData.gender !== undefined) localStorage.setItem('user_gender', additionalData.gender);
          
          if (additionalData.interests && Array.isArray(additionalData.interests)) {
            localStorage.setItem('user_interests', JSON.stringify(additionalData.interests));
          }
          if (additionalData.genderPreference && Array.isArray(additionalData.genderPreference)) {
            localStorage.setItem('user_genderPreference', JSON.stringify(additionalData.genderPreference));
          }
          if (additionalData.photos && Array.isArray(additionalData.photos)) {
            localStorage.setItem('user_photos', JSON.stringify(additionalData.photos));
          }
        }
        
        // 2. Also update mockUserProfile
        // Get current stored data or create new object
        const savedUserProfile = localStorage.getItem('mockUserProfile');
        let profileData = savedUserProfile ? JSON.parse(savedUserProfile) : {};
        
        // Update relevant fields
        profileData = {
          ...profileData,
          username: updatedUser.username,
          firstName: updatedUser.first_name || '',
          lastName: updatedUser.last_name === undefined ? '' : (updatedUser.last_name || ''),
          avatar: updatedUser.profile_picture,
          email: updatedUser.email
        };
        
        // If additional data provided (major, year, interests, etc.), also update
        if (additionalData) {
          profileData = {
            ...profileData,
            ...additionalData
          };
        }
        
        // Save back to localStorage
        try {
          localStorage.setItem('mockUserProfile', JSON.stringify(profileData));
          console.log("[DEV MODE] Updated user profile in localStorage:", profileData);
        } catch (error) {
          // If mockUserProfile save fails (possibly due to size), first remove photos
          if (profileData.photos && profileData.photos.length > 0) {
            console.warn("[DEV MODE] Failed to save complete data, trying without photos");
            const minimalData = {...profileData, photos: []};
            localStorage.setItem('mockUserProfile', JSON.stringify(minimalData));
          }
        }
        
        console.log("[DEV MODE] Updated user profile in fragmented storage and mockUserProfile");
      } catch (error) {
        console.error("[DEV MODE] Error updating user profile:", error);
      }
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
