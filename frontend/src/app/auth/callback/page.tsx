"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, Center, Text, Stack, Button } from "@mantine/core";

const AuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const username = searchParams.get("username");
        const error = searchParams.get("error");

        if (error) {
          setError(error);
          return;
        }

        if (!accessToken || !refreshToken || !username) {
          setError("Missing authentication data");
          return;
        }

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        router.push(`/${username}/home`);
      } catch (error) {
        console.error("Error handling callback:", error);
        setError("An unexpected error occurred");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  const handleReturnToLogin = () => {
    router.push("/");
  };

  return (
    <Center h="100vh">
      {error ? (
        <Stack align="center" gap="md">
          <Text color="red" size="lg" fw={700}>
            Authentication Error
          </Text>
          <Text>{error}</Text>
          <Button onClick={handleReturnToLogin} variant="filled" color="blue">
            Return to Login
          </Button>
        </Stack>
      ) : (
        <Stack align="center" gap="md">
          <Loader size="xl" />
          <Text size="lg">Completing authentication...</Text>
        </Stack>
      )}
    </Center>
  );
};

export default AuthCallback;
