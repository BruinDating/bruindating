"use client";

import {
  Text,
  Button,
  Group,
  TextInput,
  Loader,
  Center,
  MultiSelect,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/Auth/AuthContext";
import Image from "next/image";

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

const interestOptions = [
  { value: "Reading", label: "Reading" },
  { value: "Sports", label: "Sports" },
  { value: "Music", label: "Music" },
  { value: "Art", label: "Art" },
  { value: "Travel", label: "Travel" },
  { value: "Cooking", label: "Cooking" },
  { value: "Gaming", label: "Gaming" },
  { value: "Movies", label: "Movies" },
  { value: "Technology", label: "Technology" },
  { value: "Photography", label: "Photography" },
  { value: "Dancing", label: "Dancing" },
  { value: "Hiking", label: "Hiking" },
  { value: "Yoga", label: "Yoga" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Non-binary", label: "Non-binary" },
  { value: "Other", label: "Other" },
];

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
    const checkAuth = async () => {
      if (!isAuthenticated || !user?.email) {
        router.push("/");
        return;
      }
      
      const accessToken = localStorage.getItem("access_token");
      const profileResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).catch(() => null);
      
      if (profileResponse?.ok) {
        const profileData = await profileResponse.json();
        
        if (profileData) {
          const formValues = {
            bio: profileData.bio || "",
            major: profileData.major || "",
            year: profileData.year || "",
            age: profileData.age || 18,
            interests: profileData.interests || [],
            gender: profileData.gender || "",
            genderPreference: profileData.gender_preference || [],
            location: profileData.location || "",
          };
          
          form.setValues(formValues);
          
          if (profileData.photos && profileData.photos.length > 0) {
            setImage(profileData.photos[0]);
          }
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, router]);

  const handleSubmit = async (values: QuestionnaireFormValues) => {
    if (!isAuthenticated || !user?.email) return;

    setIsSubmitting(true);
    setError(null);
    const accessToken = localStorage.getItem("access_token");

    const profileData = {
      bio: values.bio,
      major: values.major,
      year: values.year,
      age: Number(values.age),
      interests: values.interests.length > 0 ? values.interests : ["None"],
      photos: image ? [image] : [],
      location: values.location,
      gender: values.gender,
      gender_preference: values.genderPreference,
    };

    const profileCheckResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).catch(() => null);

    let profileId;
    let method = "POST";
    
    if (profileCheckResponse?.ok) {
      const existingProfile = await profileCheckResponse.json();
      if (existingProfile && existingProfile.id) {
        profileId = existingProfile.id;
        method = "PUT";
      }
    }
    
    const endpoint = method === "PUT" 
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${profileId}/`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/`;

    const response = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    }).catch(() => null);

    if (response?.ok) {
      const username = user.username || user.email.split("@")[0];
      router.push(`/${username}/home`);
    } else {
      setError("Failed to save profile. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  const handleDrop = (files: File[]) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  if (isLoading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Center p="xl">
      <div className="container mx-auto p-4">
        <Text size="xl" fw={700} mb="lg">
          Complete Your Profile
        </Text>

        {error && (
          <Text c="red" mb="md">
            {error}
          </Text>
        )}

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

            {image && (
              <div className="mt-2 relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={image}
                  alt="Profile preview"
                  fill
                  style={{ objectFit: "cover" }}
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
              min={18}
              {...form.getInputProps("age")}
              styles={textInputStyles}
            />

            <Select
              label="Gender"
              placeholder="Select your gender"
              data={genderOptions}
              {...form.getInputProps("gender")}
              styles={textInputStyles}
            />

            <TextInput
              label="Location"
              placeholder="Your location"
              {...form.getInputProps("location")}
              styles={textInputStyles}
            />

            <MultiSelect
              label="Interests"
              placeholder="Select your interests"
              data={interestOptions}
              {...form.getInputProps("interests")}
              styles={textInputStyles}
            />

            <MultiSelect
              label="Gender Preference"
              placeholder="Select gender preferences"
              data={genderOptions}
              {...form.getInputProps("genderPreference")}
              styles={textInputStyles}
            />
          </div>

          <Button
            type="submit"
            color="blue"
            size="md"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </Center>
  );
}
