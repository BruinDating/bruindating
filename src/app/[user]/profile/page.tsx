"use client";

import { useState } from "react";
import { Container, Tabs, TabsList, TabsTab } from "@mantine/core";
import { UserData } from "@/types/types";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import About from "@/components/Profile/About";
import Interests from "@/components/Profile/Interests";
import Photos from "@/components/Profile/Photos";
import { currentUser } from "@/mockData/mockData";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<string | null>("about");

  const profile: UserData = currentUser;

  return (
    <Container size="lg" py="xl">
      <ProfileHeader userData={profile} />
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsList mb="md">
          <TabsTab value="about">About</TabsTab>
          <TabsTab value="photos">Photos</TabsTab>
          <TabsTab value="interests">Interests</TabsTab>
        </TabsList>
        <About userData={profile} />
        <Photos userData={profile} />
        <Interests userData={profile} />
      </Tabs>
    </Container>
  );
};

export default Profile;
