import {
  Tabs,
  Paper,
  Title,
  Select,
  Stack,
  Group,
  Switch,
  Divider,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const PrivacySettings = () => {
  const privacyForm = useForm({
    initialValues: {
      profileVisibility: "public",
      showOnlineStatus: true,
      showLastActive: true,
      allowTagging: true,
    },
  });

  return (
    <Tabs.Panel value="privacy">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form onSubmit={privacyForm.onSubmit((values) => console.log(values))}>
          <Title order={4} mb="md">
            Privacy Settings
          </Title>

          <Select
            label="Profile Visibility"
            placeholder="Who can see your profile"
            data={[
              {
                value: "public",
                label: "Public - Everyone can see your profile",
              },
              {
                value: "matches",
                label: "Matches Only - Only people you match with",
              },
              { value: "private", label: "Private - Hidden from search" },
            ]}
            mb="md"
            {...privacyForm.getInputProps("profileVisibility")}
          />

          <Stack mt="xl">
            <Group justify="space-between">
              <div>
                <Text>Show Online Status</Text>
                <Text size="xs" c="dimmed">
                  Let others see when you're online
                </Text>
              </div>
              <Switch
                {...privacyForm.getInputProps("showOnlineStatus", {
                  type: "checkbox",
                })}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <div>
                <Text>Show Last Active</Text>
                <Text size="xs" c="dimmed">
                  Let others see when you were last active
                </Text>
              </div>
              <Switch
                {...privacyForm.getInputProps("showLastActive", {
                  type: "checkbox",
                })}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <div>
                <Text>Allow Tagging</Text>
                <Text size="xs" c="dimmed">
                  Allow others to tag you in posts
                </Text>
              </div>
              <Switch
                {...privacyForm.getInputProps("allowTagging", {
                  type: "checkbox",
                })}
              />
            </Group>
          </Stack>

          <Group justify="flex-end" mt="xl">
            <Button type="submit">Save Privacy Settings</Button>
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default PrivacySettings;
