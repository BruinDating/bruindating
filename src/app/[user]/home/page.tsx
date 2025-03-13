"use client";

import {
  Card,
  CardSection,
  Center,
  ActionIcon,
  Flex,
  Transition,
  MantineTransition,
  Text,
  Loader,
} from "@mantine/core";
import { IconX, IconHeart } from "@tabler/icons-react";
import { motion } from "motion/react";
import SwipingCarousel from "@/components/Home/SwipingCarousel/SwipingCarousel";
import { useEffect, useState } from "react";

import { ExtendedMatchData } from "@/types/types";
import {
  dislikeProfile,
  fetchPotentialMatches,
  likeProfile,
} from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [opened, setOpened] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const [transition, setTransition] =
    useState<MantineTransition>("pop-top-right");
  const [scale, setScale] = useState(1);
  const [potentialMatches, setPotentialMatches] = useState<ExtendedMatchData[]>(
    []
  );
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPotentialMatches = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");
        const matches = await fetchPotentialMatches(accessToken);
        setPotentialMatches(matches as ExtendedMatchData[]);
      } catch (err) {
        setError("Failed to load potential matches. Please try again later.");
        console.error("Error loading potential matches:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPotentialMatches();
  }, [isAuthenticated]);

  const handleLike = async () => {
    if (
      potentialMatches.length === 0 ||
      currentProfileIndex >= potentialMatches.length
    )
      return;

    try {
      const accessToken = localStorage.getItem("access_token");
      const userId = potentialMatches[currentProfileIndex].id.toString();
      await likeProfile(userId, accessToken);

      setTransition("slide-right");
      setOpened(false);
      setTimeout(() => {
        setCurrentProfileIndex((prev) => prev + 1);
        setTransition("pop-top-right");
        setOpened(true);
      }, 500);
    } catch (err) {
      console.error("Error liking profile:", err);
    }
  };

  const handleDislike = async () => {
    if (
      potentialMatches.length === 0 ||
      currentProfileIndex >= potentialMatches.length
    )
      return;

    try {
      const accessToken = localStorage.getItem("access_token");
      const userId = potentialMatches[currentProfileIndex].id.toString();
      await dislikeProfile(userId, accessToken);

      setTransition("slide-left");
      setOpened(false);
      setTimeout(() => {
        setCurrentProfileIndex((prev) => prev + 1);
        setTransition("pop-top-right");
        setOpened(true);
      }, 500);
    } catch (err) {
      console.error("Error disliking profile:", err);
    }
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text c="red">{error}</Text>
      </Center>
    );
  }

  if (
    potentialMatches.length === 0 ||
    currentProfileIndex >= potentialMatches.length
  ) {
    return (
      <Center h="50vh">
        <Text>No more profiles to show. Check back later!</Text>
      </Center>
    );
  }

  const currentProfile = potentialMatches[currentProfileIndex];
  const profileImages = currentProfile.photos || [];

  return (
    <motion.div animate={{ scale: scale }}>
      <Transition mounted={opened} transition={transition} duration={400}>
        {(styles) => (
          <Center h="100vh" px="xl" style={styles}>
            <Card
              w={600}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ backgroundColor: "#dbdbdb" }}
            >
              <CardSection>
                <SwipingCarousel
                  images={profileImages}
                  name={currentProfile.name}
                  age={currentProfile.age}
                  major={currentProfile.major}
                  bio={currentProfile.bio}
                />
              </CardSection>
              <Flex gap={200} justify="center" p="xl">
                <ActionIcon
                  size="xl"
                  color="red"
                  variant="transparent"
                  onClick={handleDislike}
                >
                  <IconX size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="green"
                  variant="transparent"
                  onClick={handleLike}
                >
                  <IconHeart size={48} />
                </ActionIcon>
              </Flex>
            </Card>
          </Center>
        )}
      </Transition>
    </motion.div>
  );
};

export default Home;
