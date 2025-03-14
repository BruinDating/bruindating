"use client";
import { AuthContextType, User } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
    ).catch(() => null);

    if (response?.ok) {
      const userData = await response.json();
      setUser(userData);
      setIsAuthenticated(true);

      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      ).catch(() => null);

      if (profileResponse?.ok) {
        const profileData = await profileResponse.json();
        
        const profileExists = profileData && profileData.email === userData.email;
        const isProfileComplete = profileExists &&
          profileData.major &&
          profileData.year &&
          profileData.age &&
          profileData.gender &&
          profileData.interests &&
          profileData.interests.length > 0;

        if (profileExists && isProfileComplete) {
          router.push(`/${userData.username}/home`);
        } else {
          router.push("/questionnaire");
        }
      } else {
        router.push("/questionnaire");
      }
    } else if (response?.status === 401) {
      const refreshed = await refreshToken();
      
      if (refreshed) {
        const newAccessToken = localStorage.getItem("access_token");
        const retryResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
              "Content-Type": "application/json",
            },
          }
        ).catch(() => null);

        if (retryResponse?.ok) {
          const userData = await retryResponse.json();
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          handleTokenFailure();
        }
      } else {
        handleTokenFailure();
      }
    }
    
    setIsLoading(false);
  };

  const handleTokenFailure = () => {
    const isIntentionalLogout = localStorage.getItem("intentional_logout") === "true";
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async (): Promise<boolean> => {
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
    ).catch(() => null);

    if (response?.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      return true;
    } else {
      if (response?.status === 401 || response?.status === 400) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
      return false;
    }
  };

  const login = async () => {
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
    ).catch(() => null);

    if (response?.ok) {
      const data = await response.json();
      if (data.auth_url) {
        router.push(data.auth_url);
      }
    }
    
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    localStorage.setItem("intentional_logout", "true");
    
    setUser(null);
    setIsAuthenticated(false);

    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      ).catch(() => null);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/");
    setIsLoading(false);
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
      refreshToken().then((refreshed) => {
        if (refreshed) {
          getUserInfo();
        }
      });
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
