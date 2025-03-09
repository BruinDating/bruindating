import {
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Switch,
  Tabs,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { UserData } from "@/types/types";

const NotificationSettings = ({currentUser}:{currentUser: UserData}) => {
  const notificationForm = useForm({
    initialValues: {
      newMatches: currentUser.notiNewMatches,
      messages: currentUser.notiMessages,
      appUpdates: currentUser.notiAppUpdates,
      emailNotifications: currentUser.notiEmailNotifications,
    },
  });
  return (
    <Tabs.Panel value="notifications">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form
          onSubmit={notificationForm.onSubmit((values) => console.log(values))}
        >
          <Title order={4} mb="md">
            Notification Settings
          </Title>

          <Stack>
            <Group justify="space-between">
              <div>
                <Text>New Matches</Text>
                <Text size="xs" c="dimmed">
                  Get notified when you match with someone
                </Text>
              </div>
              <Switch
                {...notificationForm.getInputProps("newMatches", {
                  type: "checkbox",
                })}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <div>
                <Text>Messages</Text>
                <Text size="xs" c="dimmed">
                  Get notified when you receive new messages
                </Text>
              </div>
              <Switch
                {...notificationForm.getInputProps("messages", {
                  type: "checkbox",
                })}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <div>
                <Text>App Updates</Text>
                <Text size="xs" c="dimmed">
                  Get notified about app updates and new features
                </Text>
              </div>
              <Switch
                {...notificationForm.getInputProps("appUpdates", {
                  type: "checkbox",
                })}
              />
            </Group>

            <Divider />

            <Group justify="space-between">
              <div>
                <Text>Email Notifications</Text>
                <Text size="xs" c="dimmed">
                  Receive notifications via email
                </Text>
              </div>
              <Switch
                {...notificationForm.getInputProps("emailNotifications", {
                  type: "checkbox",
                })}
              />
            </Group>
          </Stack>

          <Group justify="flex-end" mt="xl">
            <Button type="submit">Save Settings</Button>
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default NotificationSettings;
