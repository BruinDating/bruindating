import { useState, useRef } from 'react';
import { Avatar, Button, Paper} from '@mantine/core';



export function UserInfoAction() {
    //== get default user profile from database ==//
    const [pfp, setPfp] = useState("https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png")

    //== get user input for profile picture ==//
    const fileInputRef = useRef<HTMLInputElement>(null);

    function buttonHandle(){
        // command to get user input for a profile picture, and then send it to the database 
        fileInputRef.current?.click();
    }

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]; // Get the selected file
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Convert file to a temporary URL
            setPfp(imageUrl); // Update the profile picture
            //!! == send to database == !!//
        }
    }

  return (
    <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
      <Avatar
        src={pfp}
        size={120}
        radius={120}
        mx="auto"
      />
    <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*" // Restrict to image files
        onChange={handleFileChange} // Handle file selection
      />
      <Button variant="default" fullWidth mt="md" onClick={buttonHandle}>
        Change profile picture
      </Button>
    </Paper>
  );
}