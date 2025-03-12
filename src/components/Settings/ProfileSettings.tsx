import { SettingsProps } from "@/types/types";
import {
  Tabs,
  Paper,
  Title,
  Group,
  Box,
  Avatar,
  Button,
  Stack,
  TextInput,
  Textarea,
  SimpleGrid,
  Select,
  NumberInput,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const ProfileSettings = ({
  majorOptions,
  yearOptions,
  interestOptions,
}: SettingsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const profileForm = useForm({
    initialValues: {
      name: "",
      username: "",
      email: "",
      bio: "",
      major: "",
      year: "",
      age: 18,
      interests: [] as string[],
      profile_picture: null as string | null,
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // Replace with the actual user's email
        const currentUserEmail = "jasonvu8@ucla.edu";
        const response = await fetch(`http://127.0.0.1:8000/api/profiles/${encodeURIComponent(currentUserEmail)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        
        // Update form with fetched data
        profileForm.setValues({
          name: data.name,
          username: data.username || data.name.toLowerCase().replace(/\s+/g, '_'),
          email: data.email,
          bio: data.bio || "",
          major: data.major,
          year: data.year || "Freshman",
          age: data.age,
          interests: data.hobbies ? data.hobbies.split(',').map((hobby: string) => hobby.trim()) : [],
        });

        // Set profile picture
        if (data.profile_picture) {
          const pictureUrl = data.profile_picture.startsWith('http') 
            ? data.profile_picture 
            : `http://127.0.0.1:8000${data.profile_picture}`;
          setProfilePicture(pictureUrl);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (values: typeof profileForm.values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === 'interests') {
          formData.append('hobbies', (value as string[]).join(', '));
        } else if (value !== null) {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch(`http://127.0.0.1:8000/api/profiles/${encodeURIComponent(values.email)}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <Tabs.Panel value="profile">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form onSubmit={profileForm.onSubmit(handleSubmit)}>
          <Title order={4} mb="md">
            Profile Information
          </Title>

          <Group align="flex-start" mb="md">
            <Box>
              <Avatar 
                size={100} 
                radius="md" 
                src={profilePicture || "/images/default-profile.png"}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "/images/default-profile.png";
                }}
              />
              <Button
                component="label"
                variant="light"
                size="xs"
                mt="xs"
                leftSection={<IconUpload size={14} />}
              >
                Change
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        const result = reader.result as string;
                        setProfilePicture(result);
                        profileForm.setFieldValue('profile_picture', result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Button>
            </Box>

            <Stack style={{ flex: 1 }}>
              <TextInput
                label="Full Name"
                placeholder="Your name"
                {...profileForm.getInputProps("name")}
              />
              <TextInput
                label="Username"
                placeholder="Your username"
                {...profileForm.getInputProps("username")}
              />
            </Stack>
          </Group>

          <TextInput
            label="Email"
            placeholder="Your email"
            mb="md"
            {...profileForm.getInputProps("email")}
            disabled
          />

          <Textarea
            label="Bio"
            placeholder="Tell us about yourself"
            minRows={3}
            mb="md"
            {...profileForm.getInputProps("bio")}
          />

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select
              label="Major"
              placeholder="Select your major"
              data={majorOptions}
              {...profileForm.getInputProps("major")}
            />
            <Select
              label="Year"
              placeholder="Select your year"
              data={yearOptions}
              {...profileForm.getInputProps("year")}
            />
            <NumberInput
              label="Age"
              placeholder="Your age"
              min={18}
              max={100}
              {...profileForm.getInputProps("age")}
            />
          </SimpleGrid>

          <MultiSelect
            label="Interests"
            placeholder="Select your interests"
            data={interestOptions}
            mt="md"
            {...profileForm.getInputProps("interests")}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="default" type="reset" onClick={() => profileForm.reset()}>Reset</Button>
            <Button type="submit">Save Changes</Button>
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default ProfileSettings;
