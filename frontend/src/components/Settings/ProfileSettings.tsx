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
import { useState, useRef } from "react";
import { UserData } from "@/types/types";
import { SendData } from "@/components/Settings/SendData";

const ProfileSettings = ({
  currentUser,
  majorOptions,
  yearOptions,
  interestOptions,
}: SettingsProps) => {
  const profileForm = useForm({
    initialValues: {
      name: currentUser.name,
      username: currentUser.username,
      email: currentUser.email,
      bio: currentUser.bio,
      major: currentUser.major,
      year: currentUser.year,
      age: currentUser.age,
      interests: currentUser.interests,
    },
  });

  const [pfp, setPfp] = useState(currentUser.avatar);

  function ProfilePic() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPfp(imageUrl);
      }
    }

    function buttonHandle() {
      fileInputRef.current?.click();
    }

    return (
      <Box>
        <Avatar size={100} radius="md" src={pfp && pfp !== "" ? pfp : null} />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button
          variant="light"
          size="xs"
          mt="xs"
          leftSection={<IconUpload size={14} />}
          onClick={buttonHandle}
        >
          Change
        </Button>
      </Box>
    );
  }

  return (
    <Tabs.Panel value="profile">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const updateUser: UserData = {
              name: profileForm.values.name,
              username: profileForm.values.username,
              avatar: pfp,
              email: profileForm.values.email,
              bio: profileForm.values.bio,
              age: profileForm.values.age,
              major: profileForm.values.major,
              year: profileForm.values.year,
              interests: profileForm.values.interests,
              photos: currentUser.photos,
              dpAgeRange: currentUser.dpAgeRange,
              dpDistance: currentUser.dpDistance,
              dpShowMe: currentUser.dpShowMe,
              dpInterests: currentUser.dpInterests,
              dpMajors: currentUser.dpMajors,
              notiNewMatches: currentUser.notiNewMatches,
              notiMessages: currentUser.notiMessages,
              notiAppUpdates: currentUser.notiAppUpdates,
              notiEmailNotifications: currentUser.notiEmailNotifications,
              priProfileVisibility: currentUser.priProfileVisibility,
              priShowOnlineStatus: currentUser.priShowOnlineStatus,
              priShowLastActive: currentUser.priShowLastActive,
              priAllowTagging: currentUser.priAllowTagging,
            };
            SendData({ updateUser });
          }}
        >
          <Title order={4} mb="md">
            Profile Information
          </Title>

          <Group align="flex-start" mb="md">
            <ProfilePic />
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
            <Button type="submit">Save Changes</Button>
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default ProfileSettings;
