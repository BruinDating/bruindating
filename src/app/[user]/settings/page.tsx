"use client";

import { useState } from "react";
import { Container, Title, Tabs } from "@mantine/core";
import {
  IconUser,
  IconBell,
  IconFilter,
  IconShield,
} from "@tabler/icons-react";
import ProfileSettings from "@/components/Settings/ProfileSettings";
import PreferencesSettings from "@/components/Settings/PreferencesSettings";
import NotificationSettings from "@/components/Settings/NotificationsSettings";
import PrivacySettings from "@/components/Settings/PrivacySettings";
import { settingsOptions, currentUser } from "@/mockData/mockData"; 

// get user data from database
const accessToken = localStorage.getItem("access_token");

const getUserData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    //==!! implement error handler !!==//
    //errorHandler(error);
    return null;
  }
};

const CurrentUser = getUserData();

const Settings = () => {

  const [activeTab, setActiveTab] = useState<string | null>("profile");

  const { majorOptions, yearOptions, interestOptions } = settingsOptions;

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">
        Settings
      </Title>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List mb="md">
          <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="preferences" leftSection={<IconFilter size={16} />}>
            Preferences
          </Tabs.Tab>
          <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
            Notifications
          </Tabs.Tab>
          <Tabs.Tab value="privacy" leftSection={<IconShield size={16} />}>
            Privacy
          </Tabs.Tab>
        </Tabs.List>
        <ProfileSettings
          currentUser={currentUser}
          majorOptions={majorOptions}
          yearOptions={yearOptions}
          interestOptions={interestOptions}
        />
        <PreferencesSettings
          currentUser={currentUser}
          majorOptions={majorOptions}
          yearOptions={yearOptions}
          interestOptions={interestOptions}
        />
        <NotificationSettings 
          currentUser={currentUser}
        />
        <PrivacySettings 
          currentUser={currentUser}
        />
      </Tabs>
    </Container>
  );
};

export default Settings;
