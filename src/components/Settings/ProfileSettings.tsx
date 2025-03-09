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


const ProfileSettings = ({
  majorOptions,
  yearOptions,
  interestOptions,
}: SettingsProps) => {
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

//=====================//
//== profile picture ==//
//=====================//
  function ProfilePic(){
    const [pfp, setPfp] = useState("https://placehold.co/400");

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


//==========//
//== name ==//
//==========//
function Name(){
  return(
    <TextInput
      label="Full Name"
      placeholder="Your name"
      {...profileForm.getInputProps("name")}
    />
  );
}


//==============//
//== username ==//
//==============//
function Username(){
  return(
    <TextInput
      label="Username"
      placeholder="Your username"
      {...profileForm.getInputProps("username")}
    />
  );
}


//===========//
//== email ==//
//===========//
function Email(){
  return(
    <TextInput
      label="Email"
      placeholder="Your email"
      mb="md"
      {...profileForm.getInputProps("email")}
    />
  );
}


//=========//
//== Bio ==//
//=========//
function Bio(){
  return(
    <Textarea
        label="Bio"
        placeholder="Tell us about yourself"
        minRows={3}
        mb="md"
        {...profileForm.getInputProps("bio")}
      />
  );
}


//===========//
//== major ==//
//===========//
function Major(){
  return(
    <Select
      label="Major"
      placeholder="Select your major"
      data={majorOptions}
      {...profileForm.getInputProps("major")}
    />
  );
}

//==========//
//== Year ==//
//==========//
function Year(){
  return(
    <Select
      label="Year"
      placeholder="Select your year"
      data={yearOptions}
      {...profileForm.getInputProps("year")}
    />
  );
}


//=========//
//== age ==//
//=========//
function Age(){
  return(
    <NumberInput
      label="Age"
      placeholder="Your age"
      min={18}
      max={100}
      {...profileForm.getInputProps("age")}
    />
  );
}

//============//
//== submit ==//
//============//
function Submit(){
  return(
    <Button type="submit">Save Changes</Button>
  );
}

//===============//
//== interests ==//
//====-----======//
function Interests(){
  return(
    <MultiSelect
      label="Interests"
      placeholder="Select your interests"
      data={interestOptions}
      mt="md"
      {...profileForm.getInputProps("interests")}
    />
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
              <Name />
              <Username />
            </Stack>
          </Group>

          <Email />
          <Bio />
          

          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            <Major />
            <Year />
            <Age />
          </SimpleGrid>

          <Interests />

          <Group justify="flex-end" mt="xl">
            <Submit />
          </Group>
        </form>
      </Paper>
    </Tabs.Panel>
  );
};

export default ProfileSettings;
