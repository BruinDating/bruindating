"use client";

import { Text, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";
import { useState } from "react"; // Removed useEffect since we don't need it anymore
import { useRouter } from 'next/navigation';

const textInputStyles = {
    label: {
      color: "#000",
    },
    input: {
      backgroundColor: "#f8f9fa",
      color: "#333",
      border: "1px solid #ccc",
      width: "100%",
      maxWidth: "400px",
    },
};

export default function Page() {
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDrop = (files: File[]) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event) => setImage(event.target?.result as string);
        reader.readAsDataURL(file);
    };

    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            age: "",
            gender: "",
            major: "",
            hobbies: "",
            profile_picture: "" as string | null
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append('email', values.email);
            formData.append('name', values.name);
            formData.append('age', values.age);
            formData.append('gender', values.gender);
            formData.append('major', values.major);
            formData.append('hobbies', values.hobbies);
            
            if (image) {
              // Check if the image is a base64 string (which it will be from the Dropzone)
              if (image.startsWith('data:image')) {
                  // Convert base64 to blob properly
                  const base64Response = await fetch(image);
                  const blob = await base64Response.blob();
                  
                  // Create a File object with proper MIME type
                  const file = new File([blob], 'profile.jpg', { 
                      type: 'image/jpeg',
                      lastModified: new Date().getTime()
                  });
                  
                  formData.append('profile_picture', file);
                  
                  console.log('Image being sent:', file); // Debug log
              }
          }
          
          // Add headers to specify we're sending form data
          const response = await fetch('http://127.0.0.1:8000/api/profiles/', {
              method: 'POST',
              body: formData,
          });
          
          if (!response.ok) {
              const errorData = await response.text();
              console.error('Server response:', errorData); // Debug log
              throw new Error('Failed to save profile');
          }
          
          const data = await response.json();
          console.log('Profile created:', data); // Debug log
            
            // If successful, route to the home swiping page
            router.push(`/dasf/home`);
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

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

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput 
                    withAsterisk 
                    label="UCLA Email" 
                    {...form.getInputProps("email")} 
                    styles={textInputStyles}
                    placeholder="example@ucla.edu"
                />
                <TextInput 
                    withAsterisk 
                    label="Name" 
                    {...form.getInputProps("name")} 
                    styles={textInputStyles}
                    placeholder="Your full name"
                />
                <TextInput 
                    withAsterisk 
                    label="Age" 
                    type="number" 
                    {...form.getInputProps("age")} 
                    styles={textInputStyles}
                    placeholder="Your age"
                />
                <TextInput
                    withAsterisk
                    label="Gender"
                    component="select"
                    {...form.getInputProps("gender")}
                    styles={textInputStyles}
                >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </TextInput>
                <TextInput 
                    withAsterisk 
                    label="Major" 
                    {...form.getInputProps("major")} 
                    styles={textInputStyles}
                    placeholder="Your major"
                />
                <TextInput 
                    withAsterisk 
                    label="Hobbies (comma-separated)" 
                    {...form.getInputProps("hobbies")} 
                    styles={textInputStyles} 
                    placeholder="e.g. hiking, reading, cooking" 
                />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        styles={{
                            root: {
                                backgroundColor: "#007bff",
                                color: "white",
                                borderRadius: "8px",
                                padding: "10px 20px",
                                fontSize: "16px",
                                transition: "box-shadow 0.3s ease-in-out",
                                marginTop: "10px",
                                "&:hover": {
                                    backgroundColor: "#0056b3",
                                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                },
                                "&:disabled": {
                                    backgroundColor: "#ccc",
                                },
                            },
                        }}
                    >
                        {isSubmitting ? 'Saving...' : 'Next'}
                    </Button>
                </Group>
            </form>
        </div>
    );
}