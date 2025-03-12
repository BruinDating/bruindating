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
  Stack,
} from "@mantine/core";
import {
  IconRotateClockwise,
  IconX,
  IconStar,
  IconHeart,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import SwipingCarousel from "@/components/Home/SwipingCarousel/SwipingCarousel";
import { useState, useEffect } from "react";

// profile interface matching the backend response
interface Profile {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: string;
  major: string;
  profile_picture: string | null;
  hobbies: string;
}

// Formatted card data
interface CardData {
  id: number;
  name: string;
  age: number;
  gender: string;
  major: string;
  hobbies: string[];
  profile_picture: string;
}

const Home = () => {
  const [opened, setOpened] = useState(true);
  const [transition, setTransition] = useState<MantineTransition>("pop-top-right");
  const [scale, setScale] = useState(1);
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/profiles/");
        const profiles: Profile[] = await response.json();
        
        console.log('Fetched profiles:', profiles);

        const currentUserEmail = "jasonvu8@ucla.edu";
        const filteredProfiles = profiles.filter(
          (profile) => profile.email !== currentUserEmail
        );

        const formattedData = filteredProfiles.map((profile) => ({
          id: profile.id,
          name: profile.name,
          age: profile.age,
          gender: profile.gender,
          major: profile.major,
          hobbies: profile.hobbies.split(',').map(hobby => hobby.trim()),
          profile_picture: profile.profile_picture || '/images/default-profile.png'
        }));

        console.log('Formatted profiles:', formattedData);
        setCards(formattedData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const handleSwipe = async (liked: boolean) => {
    try {
      const currentProfile = cards[currentProfileIndex];
      await fetch("http://127.0.0.1:8000/api/matching/swipe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentProfile.id,
          action: liked ? "like" : "dislike",
          swiper_email: "jasonvu8@ucla.edu"
        }),
      });

      // Move to next profile with animation
      setTransition(liked ? "rotate-right" : "rotate-left");
      setOpened(false);
      setTimeout(() => {
        if (currentProfileIndex < cards.length - 1) {
          setCurrentProfileIndex(currentProfileIndex + 1);
          setOpened(true);
        }
      }, 500);
    } catch (error) {
      console.error('Error recording swipe:', error);
    }
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Text>Loading profiles...</Text>
      </Center>
    );
  }

  if (!cards.length || currentProfileIndex >= cards.length) {
    return (
      <Center h="100vh">
        <Text>No more profiles to show!</Text>
      </Center>
    );
  }

  const currentProfile = cards[currentProfileIndex];

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
              style={{ backgroundColor: "#EEEEEE" }}
            >
              <CardSection>
                <SwipingCarousel images={[currentProfile.profile_picture]} />
                <Stack gap="xs" p="md">
                  <Text size="xl" fw={500}>{currentProfile.name}, {currentProfile.age}</Text>
                  <Text size="sm">{currentProfile.gender} • {currentProfile.major}</Text>
                  <Text size="sm" c="dimmed">{currentProfile.hobbies.join(', ')}</Text>
                </Stack>
              </CardSection>
              <Flex justify="space-between" p="xl">
                <ActionIcon
                  size="xl"
                  color="yellow"
                  variant="transparent"
                  onClick={() => {
                    if (currentProfileIndex > 0) {
                      setOpened(false);
                      setTimeout(() => {
                        setCurrentProfileIndex(currentProfileIndex - 1);
                        setOpened(true);
                      }, 500);
                    }
                  }}
                >
                  <IconRotateClockwise size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="red"
                  variant="transparent"
                  onClick={() => handleSwipe(false)}
                >
                  <IconX size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  variant="transparent"
                  onClick={() => {
                    setScale(1.2);
                    setTimeout(() => {
                      setScale(1);
                      handleSwipe(true);
                    }, 1000);
                  }}
                >
                  <IconStar size={48} />
                </ActionIcon>
                <ActionIcon
                  size="xl"
                  color="teal"
                  variant="transparent"
                  onClick={() => handleSwipe(true)}
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
