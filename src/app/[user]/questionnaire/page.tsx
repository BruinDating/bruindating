"use client";

import { Text,Button, Group, TextInput} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";
import { useState, useEffect } from "react";

import { currentUser } from "@/mockData/mockData";

const textInputStyles = {
    label: {
      color: "#000", // Black label text
   
    },
    input: {
      backgroundColor: "#f8f9fa", // Light gray background
      color: "#333", // Dark text color inside the textbox
      border: "1px solid #ccc", // Subtle border
      width: "100%", // Makes inputs flexible
      maxWidth: "400px",
    },
  };
  
export default function Page() {
    const [image, setImage] = useState<string | null>(null);

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchUserData = async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(currentUser), 1000); // Simulate delay
      });
    };

    fetchUserData().then((data) => {
      form.setValues(data);
      setImage(data.profilePic || null);
    });
  }, []);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const form = useForm({
    initialValues: {
      name: "",
      hometown: "",
      age: "",
      height: "",
      religion: "",
      major: "",
      studySpot:"",
      dreamClass:"",
      interests:"",
      lateNightFood:"",
      favoriteFood:""
    },
  });

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        background: "pink",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#000" }}>
    Get to Know Yourself ❤️
  </h2>
  <Group justify="center" mt="md">
      <Dropzone
        onDrop={handleDrop}
        accept={["image/png", "image/jpeg", "image/jpg"]}
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#f8f9fa",
          border: "2px dashed #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {image ? (
            <img
  src={image}
  alt="Profile Picture"
  style={{
    width: "120px",
    height: "120px",
    borderRadius: "50%", 
    objectFit: "cover", 
  }}
/>
        ) : (
          <Group justify="center">
            <IconPhoto size={40} color="#888" />
            <Text size="xs" color="black">
              Click to upload
            </Text>
          </Group>
        )}
      </Dropzone>
    </Group>
</div>
{/* send data to backend API */}
<form onSubmit={form.onSubmit(async (values) => {
    console.log(values);
    await fetch("/api/saveUserData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    });
})}>

  <TextInput withAsterisk label="Name" {...form.getInputProps("name")} styles={textInputStyles} />
  <TextInput  label="Hometown" {...form.getInputProps("hometown")} styles={textInputStyles} />
  <TextInput  label="Age" {...form.getInputProps("age")} styles={textInputStyles} />

  {/* Height Dropdown */}
  <TextInput
    withAsterisk
    label="Height"
    component="select"
    {...form.getInputProps("height")}
    onChange={(event) => form.setFieldValue("height", event.target.value)}
    styles={textInputStyles}
  >
    <option value="">Select your height</option>
    {Array.from({ length: 32 }, (_, i) => {
      const feet = Math.floor((55 + i) / 12);
      const inches = (55 + i) % 12;
      return (
        <option key={i} value={`${feet}'${inches}"`}>
          {feet}'{inches}"
        </option>
      );
    })}
  </TextInput>

  <TextInput  label="Religion" {...form.getInputProps("religion")} styles={textInputStyles} />
  <TextInput  label="Major" {...form.getInputProps("major")} styles={textInputStyles} />
  <TextInput  label="My hobbies are..." {...form.getInputProps("interests")} styles={textInputStyles}/>
  <TextInput  label="My favorite study spot on campus is..." {...form.getInputProps("studySpot")} styles={textInputStyles}/>
  <TextInput  label="My favorite food is..." {...form.getInputProps("favoriteFood")} styles={textInputStyles}/>
  <TextInput  label="My go-to late-night food spot near UCLA is..." {...form.getInputProps("lateNightFood")} styles={textInputStyles}/>
  <TextInput  label="If I could take a class on anything at UCLA, it would be..." {...form.getInputProps("dreamClass")} styles={textInputStyles}/>

  <Group justify="flex-end" mt="md">
  <Group justify="flex-end" mt="md">
  <Button
    type="submit"
    styles={{
      root: {
        backgroundColor: "#007bff", // Blue button color
        color: "white", // White text color
        borderRadius: "8px", // Curved corners
        padding: "10px 20px", // Better padding
        fontSize: "16px", // Readable text
        transition: "box-shadow 0.3s ease-in-out",
        marginTop: "10px", 
        "&:hover": {
          backgroundColor: "#0056b3", // Darker blue on hover
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
        },
      },
    }}
  >
    Next
  </Button>
</Group>

  </Group>
</form>


    </div>
  );
}
