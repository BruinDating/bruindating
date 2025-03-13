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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const getUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
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

        // After setting user data, check if they have a profile
        const profileResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (profileResponse.ok) {
          const profiles = await profileResponse.json();
          const hasProfile = profiles.some(
            (profile: any) => profile.email === userData.email
          );

          if (!hasProfile) {
            router.push('/questionnaire');
          } else {
            router.push(`/${userData.username}/home`);
          }
        } else {
          // If we can't check profiles, default to questionnaire
          router.push('/questionnaire');
        }
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
      if (accessToken) {
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

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;