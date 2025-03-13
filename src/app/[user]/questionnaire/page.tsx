"use client";

import { Text, Button, Group, TextInput, Loader, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProfileData, submitQuestionnaire } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";

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

interface QuestionnaireFormValues {
  bio: string;
  major: string;
  year: string;
  age: number;
  interests: string[];
  gender: string;
  genderPreference: string[];
  location: string;
}

export default function Page() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<QuestionnaireFormValues>({
    initialValues: {
      bio: "",
      major: "",
      year: "",
      age: 18,
      interests: [],
      gender: "",
      genderPreference: [],
      location: "",
    },
    validate: {
      bio: (value) =>
        value.length < 10 ? "Bio must be at least 10 characters" : null,
      major: (value) => (value.length < 2 ? "Please enter your major" : null),
      year: (value) => (value.length < 2 ? "Please enter your year" : null),
      age: (value) => (value < 18 ? "You must be at least 18 years old" : null),
      gender: (value) =>
        value.length < 2 ? "Please select your gender" : null,
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);
        setError(null);

        const accessToken = localStorage.getItem("access_token");
        const profileData = await fetchProfileData({ accessToken });

        form.setValues({
          bio: profileData.bio || "",
          major: profileData.major || "",
          year: profileData.year || "",
          age: profileData.age || 18,
          interests: profileData.interests || [],
          gender: profileData.gender || "",
          genderPreference: profileData.genderPreference || [],
          location: profileData.location || "",
        });

        setImage(profileData.avatar || null);
      } catch (err) {
        setError("Failed to load profile data. Please try again later.");
        console.error("Error loading profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [isAuthenticated]);

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values: QuestionnaireFormValues) => {
    if (!isAuthenticated) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const accessToken = localStorage.getItem("access_token");
      await submitQuestionnaire(values, accessToken);

      router.push(`/${user?.username}/home`);
    } catch (err) {
      setError("Failed to submit questionnaire. Please try again later.");
      console.error("Error submitting questionnaire:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="50vh">
        <Text c="red">{error}</Text>
      </Center>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Text size="xl" fw={700} mb="lg">
        Complete Your Profile
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="mb-6">
          <Text size="lg" fw={500} mb="xs">
            Profile Picture
          </Text>
          <Dropzone
            onDrop={handleDrop}
            accept={["image/png", "image/jpeg", "image/gif"]}
            maxSize={3 * 1024 * 1024}
            mb="md"
          >
            <Group
              justify="center"
              gap="md"
              style={{ minHeight: 100, pointerEvents: "none" }}
            >
              <IconPhoto size={50} stroke={1.5} />
              <div>
                <Text size="md" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  Attach one file, size should not exceed 5mb
                </Text>
              </div>
            </Group>
          </Dropzone>

          {image && image !== "" && (
            <div className="mt-2">
              <img
                src={image}
                alt="Profile preview"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <TextInput
            label="Bio"
            placeholder="Tell us about yourself"
            {...form.getInputProps("bio")}
            styles={textInputStyles}
          />

          <TextInput
            label="Major"
            placeholder="Your major"
            {...form.getInputProps("major")}
            styles={textInputStyles}
          />

          <TextInput
            label="Year"
            placeholder="Freshman, Sophomore, etc."
            {...form.getInputProps("year")}
            styles={textInputStyles}
          />

          <TextInput
            label="Age"
            placeholder="Your age"
            type="number"
            {...form.getInputProps("age")}
            styles={textInputStyles}
          />

          <TextInput
            label="Gender"
            placeholder="Your gender"
            {...form.getInputProps("gender")}
            styles={textInputStyles}
          />

          <TextInput
            label="Location"
            placeholder="Your location"
            {...form.getInputProps("location")}
            styles={textInputStyles}
          />
        </div>

        <Button type="submit" color="#4B3F72" size="md" loading={isSubmitting}>
          Save Profile
        </Button>
      </form>
    </div>
  );
}
