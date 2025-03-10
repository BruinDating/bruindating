"use client";

import { Center, Loader, Text, Stack } from "@mantine/core";
import useRouteProtection, { AccessStatus } from "@/hooks/useRouteProtection";
import AccessDenied from "./AccessDenied";

interface ProtectedRouteProps {
  children: React.ReactNode;
  showAccessDenied?: boolean;
  autoRedirect?: boolean;
  redirectDelay?: number;
}

const ProtectedRoute = ({
  children,
  showAccessDenied = true,
  autoRedirect = true,
  redirectDelay = 3000,
}: ProtectedRouteProps) => {
  const { accessStatus, urlUsername, authenticatedUsername } =
    useRouteProtection(autoRedirect, redirectDelay);

  if (accessStatus === AccessStatus.CHECKING) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="xl" />
          <Text size="lg">Loading...</Text>
        </Stack>
      </Center>
    );
  }

  if (accessStatus === AccessStatus.DENIED && showAccessDenied) {
    return (
      <AccessDenied
        message={`You don't have permission to access this page. This page belongs to user "${urlUsername}" and you are logged in as "${authenticatedUsername}".`}
        redirectDelay={redirectDelay}
      />
    );
  }

  if (accessStatus === AccessStatus.UNAUTHENTICATED && showAccessDenied) {
    return (
      <AccessDenied
        message="You need to be logged in to access this page."
        redirectDelay={redirectDelay}
      />
    );
  }

  if (accessStatus !== AccessStatus.GRANTED) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
