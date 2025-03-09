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
import { UserData } from "@/types/types";

const PrivacySettings = ({currentUser}:{currentUser: UserData}) => {
  const privacyForm = useForm({
    initialValues: {
      profileVisibility: currentUser.priProfileVisibility,
      showOnlineStatus: currentUser.priShowOnlineStatus,
      showLastActive: currentUser.priShowLastActive,
      allowTagging: currentUser.priAllowTagging,
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
      
        notiNewMatches: currentUser.notiNewMatches,
        notiMessages: currentUser.notiMessages,
        notiAppUpdates: currentUser.notiAppUpdates,
        notiEmailNotifications : currentUser.notiEmailNotifications,
      
        priProfileVisibility: privacyForm.values.profileVisibility,
        priShowOnlineStatus: privacyForm.values.showOnlineStatus,
        priShowLastActive: privacyForm.values.showLastActive,
        priAllowTagging: privacyForm.values.allowTagging,
      };

      //==!! send updateUse variable back to database !!==//
      console.log("Data sent %s", (updateUser.priAllowTagging));
    }
    return(
      <Button type="submit" onClick={buttonHandle}>Save Changes</Button>
    );
  }

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
            <Submit />
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default PrivacySettings;
