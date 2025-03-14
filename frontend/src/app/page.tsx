"use client";
import LandingBg from "@/media/LandingPage/landing-bg.webp";
import { Button, Stack, Text } from "@mantine/core";
import styles from "./page.module.css";
import Image from "next/image";
import { useAuth } from "@/components/Auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LandingPage = () => {
  const { login, isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated, AuthContext will handle routing");
    }
  }, [isAuthenticated, user]);

  const handleSignIn = async () => {
    await login();
  };

  return (
    <>
      <div className={styles.bgWrap}>
        <Image
          fill
          src={LandingBg}
          alt="Landing Page Background Image"
          priority
          placeholder="blur"
          quality={100}
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        ></Image>
      </div>
      <Stack h="100vh" w="100vw" justify="center" align="center">
        <Text fz="x5l" fw={700} c="#D4A5E3" className={styles.bgText}>
          BRUIN DATING
        </Text>
        <Button
          variant="filled"
          color="#4B3F72"
          size="xl"
          radius="xl"
          onClick={handleSignIn}
          loading={isLoading}
        >
          Sign In with UCLA Account
        </Button>
      </Stack>
    </>
  );
};
export default LandingPage;
