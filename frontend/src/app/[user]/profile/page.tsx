"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  TabsList,
  TabsTab,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import About from "@/components/Profile/About";
import Interests from "@/components/Profile/Interests";
import Photos from "@/components/Profile/Photos";
import { fetchProfileData } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";
import { profileDataProps } from "@/types/types";

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState<profileDataProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");
        const data = await fetchProfileData({ accessToken });
        setProfileData(data);
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
        console.error("Error loading profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error || !profileData) {
    return (
      <Center h="50vh">
        <Text c="red">{error || "Failed to load profile data"}</Text>
      </Center>
    );
  }
  console.log({ profileData });
  return (
    <Container size="lg" py="xl">
      <ProfileHeader profileData={profileData} />
      <Tabs defaultValue="about">
        <TabsList mb="md">
          <TabsTab value="about">About</TabsTab>
          <TabsTab value="photos">Photos</TabsTab>
          <TabsTab value="interests">Interests</TabsTab>
        </TabsList>
        <About profileData={profileData} />
        <Photos profileData={profileData} />
        <Interests profileData={profileData} />
      </Tabs>
    </Container>
  );
};

export default Profile;
