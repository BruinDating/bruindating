"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Tabs,
  Loader,
  Center,
  Text,
  Paper,
} from "@mantine/core";
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
import { fetchProfileData } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";
import { UserData } from "@/types/types";
import { useSearchParams } from "next/navigation";

const settingsOptions = {
  majorOptions: [
    { value: "computer_science", label: "Computer Science" },
    { value: "engineering", label: "Engineering" },
    { value: "business", label: "Business" },
    { value: "psychology", label: "Psychology" },
    { value: "biology", label: "Biology" },
  ],
  yearOptions: [
    { value: "freshman", label: "Freshman" },
    { value: "sophomore", label: "Sophomore" },
    { value: "junior", label: "Junior" },
    { value: "senior", label: "Senior" },
    { value: "graduate", label: "Graduate" },
  ],
  interestOptions: [
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "art", label: "Art" },
    { value: "reading", label: "Reading" },
    { value: "travel", label: "Travel" },
    { value: "cooking", label: "Cooking" },
    { value: "gaming", label: "Gaming" },
    { value: "movies", label: "Movies" },
  ],
};

const Settings = () => {
  const { isAuthenticated, user } = useAuth();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<string | null>(
    tabParam || "profile"
  );
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");
        const profileData = await fetchProfileData({ accessToken });

        const firstName = profileData.firstName || "";
        const lastName = profileData.lastName || "";
        const name =
          firstName || lastName
            ? `${firstName} ${lastName}`.trim()
            : "Unknown User";

        const username = profileData.username || "user";
        const email = `${username}@ucla.edu`;

        setUserData({
          name,
          username,
          email,
          avatar: profileData.avatar,
          bio: profileData.bio || "",
          age: profileData.age || 18,
          major: profileData.major || "",
          year: profileData.year || "",
          interests: profileData.interests || [],
          photos: profileData.photos || [],

          dpAgeRange: [18, 30],
          dpDistance: 50,
          dpShowMe: profileData.gender === "male" ? "female" : "male",
          dpInterests: [],
          dpMajors: [],

          notiNewMatches: true,
          notiMessages: true,
          notiAppUpdates: true,
          notiEmailNotifications: true,

          priProfileVisibility: "public",
          priShowOnlineStatus: true,
          priShowLastActive: true,
          priAllowTagging: true,
        });
      } catch (err) {
        setError("Failed to load user data. Please try again later.");
        console.error("Error loading user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [isAuthenticated]);

  const handleTabChange = (value: string | null) => {
    setActiveTab(value);
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("tab", value);
    } else {
      url.searchParams.delete("tab");
    }
    window.history.pushState({}, "", url.toString());
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error || !userData) {
    return (
      <Center h="50vh">
        <Paper p="xl" shadow="md" radius="md" withBorder>
          <Text c="red" size="lg" fw={500} ta="center">
            {error || "Failed to load user data"}
          </Text>
          <Text c="dimmed" size="sm" ta="center" mt="xs">
            Please try refreshing the page or contact support if the problem
            persists.
          </Text>
        </Paper>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">
        Settings
      </Title>

      <Tabs value={activeTab} onChange={handleTabChange}>
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
          currentUser={userData}
          majorOptions={settingsOptions.majorOptions}
          yearOptions={settingsOptions.yearOptions}
          interestOptions={settingsOptions.interestOptions}
        />
        <PreferencesSettings
          currentUser={userData}
          majorOptions={settingsOptions.majorOptions}
          yearOptions={settingsOptions.yearOptions}
          interestOptions={settingsOptions.interestOptions}
        />
        <NotificationSettings currentUser={userData} />
        <PrivacySettings currentUser={userData} />
      </Tabs>
    </Container>
  );
};

export default Settings;
