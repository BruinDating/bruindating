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

  //============//
  //== submit ==//
  //============//
  function Submit(){
    function buttonHandle(){
      // create data set to send back
      const updateUser: UserData = {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        email: currentUser.email,
        bio: currentUser.bio,
        age: currentUser.age,
        major: currentUser.major,
        year: currentUser.year,
        interests: currentUser.interests,
      
        photos: currentUser.photos,
      
        dpAgeRange: currentUser.dpAgeRange,
        dpDistance: currentUser.dpDistance,
        dpShowMe: currentUser.dpShowMe,
        dpInterests: currentUser.dpInterests,
        dpMajors: currentUser.dpMajors,
      
        notiNewMatches: notificationForm.values.newMatches,
        notiMessages: notificationForm.values.messages,
        notiAppUpdates: notificationForm.values.appUpdates,
        notiEmailNotifications : notificationForm.values.emailNotifications,
      
        priProfileVisibility: currentUser.priProfileVisibility,
        priShowOnlineStatus: currentUser.priShowOnlineStatus,
        priShowLastActive: currentUser.priShowLastActive,
        priAllowTagging: currentUser.priAllowTagging,
      };

      //==!! send updateUse variable back to database !!==//
      console.log("Data sent %s", (updateUser.notiNewMatches));
    }
    return(
      <Button type="submit" onClick={buttonHandle}>Save Changes</Button>
    );
  }


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
            <Submit />
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default NotificationSettings;
