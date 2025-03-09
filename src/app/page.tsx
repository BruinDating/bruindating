"use client";
import LandingBg from "@/media/LandingPage/landing-bg.webp";
import { Button, Stack, Text } from "@mantine/core";
import styles from "./page.module.css";
import Image from "next/image";
import { useState } from "react";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
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
        window.location.href = data.auth_url;
      } else {
        console.error("Failed to get auth URL");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error initiating login:", error);
      setIsLoading(false);
    }
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
