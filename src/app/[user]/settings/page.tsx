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

//==!! when database is ready import currentUser from database. Also implement the SendData function to send data to the database !!==//

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
