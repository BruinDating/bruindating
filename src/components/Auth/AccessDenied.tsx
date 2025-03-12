"use client";

import { Center, Text, Stack, Button, Title, Progress } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect, useState } from "react";

interface AccessDeniedProps {
  message?: string;
  redirectDelay?: number;
}

const AccessDenied = ({
  message = "You do not have permission to access this page.",
  redirectDelay = 3000,
}: AccessDeniedProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const [countdown, setCountdown] = useState(redirectDelay / 1000);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });

      setProgress((prev) => {
        const newProgress = prev - 100 / (redirectDelay / 1000);
        return newProgress < 0 ? 0 : newProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [redirectDelay]);

  const handleRedirect = () => {
    if (user) {
      router.push(`/${user.username}/home`);
    } else {
      router.push("/");
    }
  };

  return (
    <Center h="100vh">
      <Stack align="center" gap="lg" w="100%" maw={500} px="md">
        <IconLock size={64} color="#e03131" />
        <Title order={2} c="red.7">
          Access Denied
        </Title>
        <Text size="lg" ta="center">
          {message}
        </Text>

        {countdown > 0 && (
          <>
            <Text size="sm" c="dimmed">
              Redirecting in {countdown} seconds...
            </Text>
            <Progress
              value={progress}
              w="100%"
              size="sm"
              color="blue"
              striped
              animated
            />
          </>
        )}

        <Button onClick={handleRedirect} color="blue" size="md" fullWidth>
          {user ? "Go to Your Home Page" : "Go to Login"}
        </Button>
      </Stack>
    </Center>
  );
};

export default AccessDenied;
