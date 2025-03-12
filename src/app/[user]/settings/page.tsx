// components/Settings/ProfileSettings.tsx
"use client";

import { TextInput, Select, Button, Group, Avatar, Tabs, RangeSlider, Slider, MultiSelect, Paper, Title, Switch, Stack, Divider, Text, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { Dropzone } from "@mantine/dropzone";
import { IconUser, IconFilter, IconBell, IconShield } from "@tabler/icons-react";

interface Profile {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: string;
  major: string;
  hobbies: string;
  profile_picture: string | null;
}

const settingsOptions = {
  majorOptions: [
    "Computer Science",
    "Engineering",
    "Biology",
    "Business",
    "Psychology",
    "Mathematics",
    "Economics",
    "Other"
  ],
  yearOptions: ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th+ Year"],
  interestOptions: [
    "Sports",
    "Music",
    "Art",
    "Gaming",
    "Reading",
    "Travel",
    "Food",
    "Movies",
    "Technology",
    "Fitness"
  ]
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string | null>("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<Profile | null>(null);

  const profileForm = useForm({
    initialValues: {
      email: "",
      name: "",
      age: "",
      gender: "",
      major: "",
      hobbies: "",
      profile_picture: null as string | null,
    },
  });

  const preferencesForm = useForm({
    initialValues: {
      ageRange: [18, 30],
      distance: 25,
      showMe: "everyone",
      interests: [],
    },
  });

  const notificationForm = useForm({
    initialValues: {
      newMatches: true,
      messages: true,
      appUpdates: false,
      emailNotifications: true,
    },
  });

  const privacyForm = useForm({
    initialValues: {
      profileVisibility: "public",
      showOnlineStatus: true,
      showLastActive: true,
      allowTagging: true,
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual email - later this will come from auth
        const email = "jasonvu8@ucla.edu";
        const response = await fetch(`http://127.0.0.1:8000/api/questionnaire/by_email/${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log('Fetched questionnaire data:', data);
        
        // Transform questionnaire data to match Profile interface
        const transformedData: Profile = {
          id: data.id,
          email: data.email,
          name: data.name,
          age: data.age,
          gender: data.gender,
          major: data.major,
          hobbies: data.hobbies || "",
          profile_picture: data.profile_picture
        };

        setProfileData(transformedData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileSubmit = async (values: typeof profileForm.values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const value = values[key as keyof typeof values];
        if (value !== null) {
          formData.append(key, String(value));
        }
      });

      const response = await fetch('http://127.0.0.1:8000/api/profiles/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handlePreferencesSubmit = async (values: typeof preferencesForm.values) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/preferences/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      alert('Preferences updated successfully!');
    } catch (error) {
      console.error('Error updating preferences:', error);
      alert('Failed to update preferences');
    }
  };

  const handleNotificationSubmit = async (values: typeof notificationForm.values) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/notifications/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification settings');
      }

      alert('Notification settings updated successfully!');
    } catch (error) {
      console.error('Error updating notification settings:', error);
      alert('Failed to update notification settings');
    }
  };

  const handlePrivacySubmit = async (values: typeof privacyForm.values) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/privacy/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update privacy settings');
      }

      alert('Privacy settings updated successfully!');
    } catch (error) {
      console.error('Error updating privacy settings:', error);
      alert('Failed to update privacy settings');
    }
  };

  if (isLoading) {
    return (
      <Paper shadow="xs" p="xl" radius="md" withBorder>
        <Text ta="center">Loading your settings...</Text>
      </Paper>
    );
  }

  return (
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

      <Tabs.Panel value="profile">
        <Paper shadow="xs" p="md" radius="md" withBorder>
          <form onSubmit={profileForm.onSubmit(handleProfileSubmit)}>
            <Title order={4} mb="md">Profile Information</Title>
            
            <Group align="flex-start" mb="md">
              <Box>
                <Avatar 
                  size={100} 
                  radius="md" 
                  src={profileForm.values.profile_picture || "/images/default-profile.png"}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = "/images/default-profile.png";
                  }}
                />
                <Dropzone
                  accept={["image/png", "image/jpeg", "image/jpg"]}
                  maxSize={5 * 1024 * 1024}
                  multiple={false}
                  onDrop={(files) => {
                    if (files.length > 0) {
                      const file = files[0];
                      const reader = new FileReader();
                      reader.onload = () => {
                        profileForm.setFieldValue('profile_picture', reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{
                    marginTop: '8px',
                    width: '100px',
                    height: '32px',
                    padding: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f1f3f5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  <Text size="sm">Change Photo</Text>
                </Dropzone>
              </Box>

              <Stack style={{ flex: 1 }}>
                <TextInput
                  label="UCLA Email"
                  {...profileForm.getInputProps("email")}
                  disabled
                  mb="md"
                />
                
                <TextInput
                  label="Full Name"
                  {...profileForm.getInputProps("name")}
                  mb="md"
                />
              </Stack>
            </Group>

            <TextInput
              label="Age"
              type="number"
              {...profileForm.getInputProps("age")}
              mb="md"
            />

            <Select
              label="Gender"
              data={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              {...profileForm.getInputProps("gender")}
              mb="md"
            />

            <TextInput
              label="Major"
              {...profileForm.getInputProps("major")}
              placeholder="Enter your major"
              mb="md"
            />

            <TextInput
              label="Hobbies (comma-separated)"
              {...profileForm.getInputProps("hobbies")}
              placeholder="e.g. hiking, reading, cooking"
              mb="md"
            />

            <Group justify="flex-end" mt="xl">
              <Button type="submit" color="blue">
                Save Profile
              </Button>
            </Group>
          </form>
        </Paper>
      </Tabs.Panel>

      <Tabs.Panel value="preferences">
        <Paper shadow="xs" p="md" radius="md" withBorder>
          <form onSubmit={preferencesForm.onSubmit(handlePreferencesSubmit)}>
            <Title order={4} mb="md">Dating Preferences</Title>

            <Title order={6} mb="xs">Age Range</Title>
            <RangeSlider
              min={18}
              max={50}
              minRange={1}
              step={1}
              marks={[
                { value: 18, label: "18" },
                { value: 25, label: "25" },
                { value: 35, label: "35" },
                { value: 50, label: "50" },
              ]}
              mb="xl"
              {...preferencesForm.getInputProps("ageRange")}
            />

            <Title order={6} mb="xs">Maximum Distance (miles)</Title>
            <Slider
              min={1}
              max={100}
              step={1}
              marks={[
                { value: 5, label: "5" },
                { value: 25, label: "25" },
                { value: 50, label: "50" },
                { value: 100, label: "100" },
              ]}
              mb="xl"
              {...preferencesForm.getInputProps("distance")}
            />

            <Select
              label="Show Me"
              placeholder="Select who to show"
              data={[
                { value: "everyone", label: "Everyone" },
                { value: "women", label: "Women" },
                { value: "men", label: "Men" },
                { value: "nonbinary", label: "Non-binary" },
              ]}
              mb="md"
              {...preferencesForm.getInputProps("showMe")}
            />

            <Group justify="flex-end" mt="xl">
              <Button type="submit" color="blue">
                Save Preferences
              </Button>
            </Group>
          </form>
        </Paper>
      </Tabs.Panel>

      <Tabs.Panel value="notifications">
        <Paper shadow="xs" p="md" radius="md" withBorder>
          <form onSubmit={notificationForm.onSubmit(handleNotificationSubmit)}>
            <Title order={4} mb="md">Notification Settings</Title>

            <Stack>
              <Group justify="space-between">
                <div>
                  <Text>New Matches</Text>
                  <Text size="xs" c="dimmed">Get notified when you match with someone</Text>
                </div>
                <Switch {...notificationForm.getInputProps("newMatches", { type: "checkbox" })} />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text>Messages</Text>
                  <Text size="xs" c="dimmed">Get notified when you receive new messages</Text>
                </div>
                <Switch {...notificationForm.getInputProps("messages", { type: "checkbox" })} />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text>App Updates</Text>
                  <Text size="xs" c="dimmed">Get notified about app updates and new features</Text>
                </div>
                <Switch {...notificationForm.getInputProps("appUpdates", { type: "checkbox" })} />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text>Email Notifications</Text>
                  <Text size="xs" c="dimmed">Receive notifications via email</Text>
                </div>
                <Switch {...notificationForm.getInputProps("emailNotifications", { type: "checkbox" })} />
              </Group>
            </Stack>

            <Group justify="flex-end" mt="xl">
              <Button type="submit" color="blue">
                Save Notification Settings
              </Button>
            </Group>
          </form>
        </Paper>
      </Tabs.Panel>

      <Tabs.Panel value="privacy">
        <Paper shadow="xs" p="md" radius="md" withBorder>
          <form onSubmit={privacyForm.onSubmit(handlePrivacySubmit)}>
            <Title order={4} mb="md">Privacy Settings</Title>

            <Select
              label="Profile Visibility"
              placeholder="Who can see your profile"
              data={[
                { value: "public", label: "Public - Everyone can see your profile" },
                { value: "matches", label: "Matches Only - Only people you match with" },
                { value: "private", label: "Private - Hidden from search" },
              ]}
              mb="md"
              {...privacyForm.getInputProps("profileVisibility")}
            />

            <Stack mt="xl">
              <Group justify="space-between">
                <div>
                  <Text>Show Online Status</Text>
                  <Text size="xs" c="dimmed">Let others see when you're online</Text>
                </div>
                <Switch {...privacyForm.getInputProps("showOnlineStatus", { type: "checkbox" })} />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text>Show Last Active</Text>
                  <Text size="xs" c="dimmed">Let others see when you were last active</Text>
                </div>
                <Switch {...privacyForm.getInputProps("showLastActive", { type: "checkbox" })} />
              </Group>

              <Divider />

              <Group justify="space-between">
                <div>
                  <Text>Allow Tagging</Text>
                  <Text size="xs" c="dimmed">Allow others to tag you in posts</Text>
                </div>
                <Switch {...privacyForm.getInputProps("allowTagging", { type: "checkbox" })} />
              </Group>
            </Stack>

            <Group justify="flex-end" mt="xl">
              <Button type="submit" color="blue">
                Save Privacy Settings
              </Button>
            </Group>
          </form>
        </Paper>
      </Tabs.Panel>
    </Tabs>
  );
};

export default Settings;