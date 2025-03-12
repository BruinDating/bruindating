"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader, Center, Text, Stack } from "@mantine/core";

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
        const new_user = searchParams.get("new_user");

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

        if (new_user === "true") {
          router.push(`/${username}/questionnaire`);
        } else {
          router.push(`/${username}/home`);
        }

        router.push(`/${username}/home`);
      } catch (error) {
        console.error("Error handling callback:", error);
        setError("An unexpected error occurred");
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <Center h="100vh">
      {error ? (
        <Stack align="center" gap="md">
          <Text color="red" size="lg" fw={700}>
            Authentication Error
          </Text>
          <Text>{error}</Text>
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
