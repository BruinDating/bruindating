import { settingsProps } from "@/types/types";
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

const ProfileSettings = ({
  majorOptions,
  yearOptions,
  interestOptions,
}: settingsProps) => {
  const profileForm = useForm({
    initialValues: {
      name: "Burak Arslan",
      username: "burak_a",
      email: "burak@example.com",
      bio: "Computer Science student at UCLA. Love hiking, coding, and meeting new people!",
      major: "Computer Science",
      year: "Junior",
      age: 21,
      interests: ["Hiking", "Coding", "Movies"],
    },
  });

  return (
    <Tabs.Panel value="profile">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form onSubmit={profileForm.onSubmit((values) => console.log(values))}>
          <Title order={4} mb="md">
            Profile Information
          </Title>

          <Group align="flex-start" mb="md">
            <Box>
              <Avatar size={100} radius="md" src="https://placehold.co/400" />
              <Button
                variant="light"
                size="xs"
                mt="xs"
                leftSection={<IconUpload size={14} />}
              >
                Change
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
            <Button variant="default">Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default ProfileSettings;
