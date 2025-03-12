"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/Auth/AuthContext";
import { useParams, useRouter } from "next/navigation";

export enum AccessStatus {
  CHECKING = "checking",
  GRANTED = "granted",
  DENIED = "denied",
  UNAUTHENTICATED = "unauthenticated",
}

export const useRouteProtection = (
  autoRedirect: boolean = false,
  redirectDelay: number = 3000
) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [accessStatus, setAccessStatus] = useState<AccessStatus>(
    AccessStatus.CHECKING
  );
  const [previousAuthState, setPreviousAuthState] = useState<boolean | null>(
    null
  );

  const urlUsername = params?.user as string;

  useEffect(() => {
    if (
      previousAuthState === true &&
      !isAuthenticated &&
      localStorage.getItem("intentional_logout") === "true"
    ) {
      router.replace("/");
    }

    setPreviousAuthState(isAuthenticated);
  }, [isAuthenticated, router]);

  useEffect(() => {
    const checkAccess = async () => {
      if (isLoading) {
        setAccessStatus(AccessStatus.CHECKING);
        return;
      }

      const hasTokens =
        localStorage.getItem("access_token") &&
        localStorage.getItem("refresh_token");
      if (!isAuthenticated && hasTokens) {
        setAccessStatus(AccessStatus.CHECKING);
        return;
      }

      if (!isAuthenticated) {
        setAccessStatus(AccessStatus.UNAUTHENTICATED);
        if (autoRedirect) {
          setTimeout(() => {
            router.push("/");
          }, redirectDelay);
        }
        return;
      }

      if (!user) {
        setAccessStatus(AccessStatus.CHECKING);
        return;
      }

      if (urlUsername && user.username !== urlUsername) {
        setAccessStatus(AccessStatus.DENIED);
        if (autoRedirect) {
          setTimeout(() => {
            router.push(`/${user.username}/home`);
          }, redirectDelay);
        }
        return;
      }

      setAccessStatus(AccessStatus.GRANTED);
    };

    checkAccess();
  }, [
    isAuthenticated,
    isLoading,
    router,
    user,
    urlUsername,
    autoRedirect,
    redirectDelay,
  ]);

  return {
    isCheckingAccess: accessStatus === AccessStatus.CHECKING,
    hasAccess: accessStatus === AccessStatus.GRANTED,
    accessStatus,
    urlUsername,
    authenticatedUsername: user?.username,
  };
};

export default useRouteProtection;
