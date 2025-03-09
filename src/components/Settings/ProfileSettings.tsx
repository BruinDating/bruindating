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
import { useState, useRef } from 'react';
// import { currentUser } from "@/mockData/mockData";


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

//=====================//
//== profile picture ==//
//=====================//
  function ProfilePic(){
    const [pfp, setPfp] = useState(currentUser.avatar); // load current users's pfp

    //== get user input for profile picture ==//
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
      const file = event.target.files?.[0]; // Get the selected file
      if (file) {
          const imageUrl = URL.createObjectURL(file); // Convert file to a temporary URL
          setPfp(imageUrl); // Update the profile picture
          //!! == send to database == !!//
      }
    }   

    function buttonHandle(){
      // command to get user input for a profile picture, and then send it to the database 
      fileInputRef.current?.click();
    }

    return(
      <Box>
        <Avatar size={100} radius="md" src={pfp} />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*" // Restrict to image files
          onChange={handleFileChange} // Handle file selection
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


  //============//
  //== submit ==//
  //============//
  function Submit(){
    function buttonHandle(){
      //send form values to database 
    }
    return(
      <Button type="submit">Save Changes</Button>
    );
  }


  return (
    <Tabs.Panel value="profile">
      <Paper shadow="xs" p="md" radius="md" withBorder>
        <form onSubmit={profileForm.onSubmit((values) => console.log(values))}>
          <Title order={4} mb="md">
            Profile Information
          </Title>

          <Group align="flex-start" mb="md">
            <ProfilePic />
            <Stack style={{ flex: 1 }}>
              <TextInput label="Full Name" placeholder="Your name" {...profileForm.getInputProps("name")} />
              <TextInput label="Username" placeholder="Your username" {...profileForm.getInputProps("username")} />
            </Stack>
          </Group>

          <TextInput label="Email" placeholder="Your email" mb="md" {...profileForm.getInputProps("email")} />
          <Textarea label="Bio" placeholder="Tell us about yourself" minRows={3} mb="md" {...profileForm.getInputProps("bio")} />
          

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Select label="Major" placeholder="Select your major" data={majorOptions} {...profileForm.getInputProps("major")} />
            <Select label="Year" placeholder="Select your year" data={yearOptions} {...profileForm.getInputProps("year")} />
            <NumberInput label="Age" placeholder="Your age" min={18} max={100} {...profileForm.getInputProps("age")} />
          </SimpleGrid>

          <MultiSelect label="Interests" placeholder="Select your interests" data={interestOptions} mt="md" {...profileForm.getInputProps("interests")} />

          <Group justify="flex-end" mt="xl">
            <Submit />
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default ProfileSettings;
