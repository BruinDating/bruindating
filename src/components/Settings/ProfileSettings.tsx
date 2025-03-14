"use client"; // Client Component

import { useState, useEffect } from "react";
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
  Center,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
import { fetchProfileData, updateUserProfile } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";

// Mock data options
const majorOptions = [
  "Computer Science",
  "Engineering",
  "Business",
  "Psychology",
  "Biology",
  "Arts",
  "Literature",
  "History",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Sociology",
  "Economics",
  "Education",
  "Medicine",
];

const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "PhD"];

const interestOptions = [
  "Sports",
  "Music",
  "Movies",
  "Reading",
  "Travel",
  "Cooking",
  "Photography",
  "Drawing",
  "Gaming",
  "Programming",
  "Dancing",
  "Yoga",
  "Hiking",
  "Fitness",
  "Chess",
];

// Function to check if avatar URL is valid
const isValidAvatarUrl = (url: string | null): boolean => {
  if (!url) return false;
  
  // Check if it's a blob URL (these become invalid after refresh)
  if (url.startsWith('blob:')) {
    return false;
  }
  
  // Check if it's a valid http/https URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return true;
  }
  
  // Check if it's a base64 encoded image
  if (url.startsWith('data:image/')) {
    return true;
  }
  
  return false;
};

// Get default avatar
const getDefaultAvatar = (): string => {
  return "https://placehold.co/200";
};

// Function to get auth token
const getAuthToken = (): string | null => {
  return typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
};

// Client Component - Handle user data fetching and form rendering
export default function ProfileSettings({ 
  userId = "1",
  majorOptions: propMajorOptions,
  yearOptions: propYearOptions,
  interestOptions: propInterestOptions,
  userData: propUserData, // Added: receives user data from parent component
}: { 
  userId?: string;
  majorOptions?: string[] | any[];
  yearOptions?: string[] | any[];
  interestOptions?: string[] | any[];
  userData?: any; // Add userData property
}) {
  const [userData, setUserData] = useState<any>(propUserData || null); // Prioritize passed data
  const [loading, setLoading] = useState(propUserData ? false : true); // Don't show loading if data exists
  const [error, setError] = useState<string | null>(null);

  // Use provided options or default options
  const finalMajorOptions = propMajorOptions || majorOptions;
  const finalYearOptions = propYearOptions || yearOptions;
  const finalInterestOptions = propInterestOptions || interestOptions;

  // Only fetch data from API if userData wasn't passed
  useEffect(() => {
    if (propUserData) {
      // If parent component passed data, use it directly
      setUserData(propUserData);
      setLoading(false);
      return;
    }
    
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get token
        const token = getAuthToken();
        
        // Use fetchProfileData from API to get user data
        const profileData = await fetchProfileData({ accessToken: token });
        
        if (profileData) {
          // Set user data to state
          setUserData({
            id: userId,
            username: profileData.username || "",
            email: profileData.email || `${profileData.username}@ucla.edu`,
            name: profileData.firstName && profileData.lastName 
              ? `${profileData.firstName} ${profileData.lastName}` 
              : profileData.username,
            bio: profileData.bio || "",
            major: profileData.major || "",
            year: profileData.year || "",
            age: profileData.age || 18,
            interests: profileData.interests || [],
            firstName: profileData.firstName || "",
            lastName: profileData.lastName || "",
            avatar: profileData.avatar || "",
            photos: profileData.photos || [],
          });
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch user data");
        
        // Set default data
        setUserData({
          id: userId,
          email: "user@example.com",
          username: "username",
          name: "User",
          bio: "",
          major: "",
          year: "",
          age: 18,
          interests: [],
          firstName: "User",
          lastName: "",
          profile_visibility: "public",
          max_distance: 50,
          age_min: 18,
          age_max: 35,
          email_notifications: true,
          match_notifications: true,
          message_notifications: true,
          show_online_status: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, propUserData]);

  // Show loading state
  if (loading) {
    return (
      <Center p="xl">
        <Loader size="md" />
      </Center>
    );
  }

  // Show error message
  if (error && !userData) {
    return (
      <Center p="xl">
        <div>Failed to load user data: {error}</div>
      </Center>
    );
  }

  // Render profile form
  return (
    <ProfileSettingsClient
      userData={userData}
      majorOptions={finalMajorOptions}
      yearOptions={finalYearOptions}
      interestOptions={finalInterestOptions}
    />
  );
}

// Client Component - Handle form rendering and submission
function ProfileSettingsClient({
  userData,
  majorOptions,
  yearOptions,
  interestOptions,
}: {
  userData: any;
  majorOptions: string[] | any[];
  yearOptions: string[] | any[];
  interestOptions: string[] | any[];
}) {
  const { updateUser } = useAuth(); // Import updateUser function from AuthContext
  
  // Check if options are in object array format and preprocess data
  const processOptions = (options: string[] | any[]): string[] | any[] => {
    if (options.length > 0 && typeof options[0] === 'object' && options[0].value !== undefined) {
      return options;
    }
    // If it's a string array, convert to object array format
    return options.map((option: string) => ({ value: option, label: option }));
  };

  // Process options format
  const formattedMajorOptions = processOptions(majorOptions);
  const formattedYearOptions = processOptions(yearOptions);
  const formattedInterestOptions = processOptions(interestOptions);
  
  // Process user's current major and year values
  const getCurrentValue = (value: string, options: any[]): string => {
    // Check if options are object array
    if (options.length > 0 && typeof options[0] === 'object' && options[0].value !== undefined) {
      // Try to find matching option
      const matchingOption = options.find(
        (opt) => opt.value === value || opt.label === value
      );
      return matchingOption ? matchingOption.value : value;
    }
    return value;
  };

  // Get current values
  const currentMajor = getCurrentValue(userData.major || '', formattedMajorOptions);
  const currentYear = getCurrentValue(userData.year || '', formattedYearOptions);
  
  const profileForm = useForm({
    initialValues: {
      ...userData,
      // Ensure form initial values include all necessary fields
      name: userData.name || userData.first_name || "",
      bio: userData.bio || "",
      major: currentMajor, // Use processed value
      year: currentYear, // Use processed value
      age: userData.age || 18,
      interests: userData.interests || [],
      email: userData.email || "",
      username: userData.username || "",
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
    },
  });

  // Ensure avatar URL is valid
  const initialAvatar = userData.profile_picture || userData.avatar;
  const validInitialAvatar = isValidAvatarUrl(initialAvatar) ? initialAvatar : getDefaultAvatar();
  
  // Avatar initial value uses user's profile_picture or avatar
  const [avatar, setAvatar] = useState(validInitialAvatar);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Compress image function
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      // Create canvas for image compression
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img') as HTMLImageElement;
      
      // Create URL to load image
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        // Release URL
        URL.revokeObjectURL(url);
        
        // Calculate compressed dimensions (max width and height set to 400px)
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;
        
        // Draw compressed image
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to lower quality JPEG format
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality JPEG
          resolve(dataUrl);
        } else {
          // If unable to get 2D context, fallback to FileReader
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }
      };
      
      img.src = url;
    });
  };

  // Handle avatar upload
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Use compression function to process image
    compressImage(file).then(compressedImage => {
      setAvatar(compressedImage);
    }).catch(error => {
      console.error("Failed to compress avatar:", error);
      
      // If compression fails, fall back to original method
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  // Cancel changes
  const handleCancel = () => {
    // Get current values
    const currentMajor = getCurrentValue(userData.major || '', formattedMajorOptions);
    const currentYear = getCurrentValue(userData.year || '', formattedYearOptions);
    
    profileForm.setValues({
      ...userData,
      name: userData.name || userData.first_name || "",
      bio: userData.bio || "",
      major: currentMajor, // Use processed value, may be empty
      year: currentYear, // Use processed value, may be empty
      age: userData.age || 18,
      interests: userData.interests || [],
    });
    
    // Reset avatar to valid initial value
    const initialAvatar = userData.profile_picture || userData.avatar;
    setAvatar(isValidAvatarUrl(initialAvatar) ? initialAvatar : getDefaultAvatar());
    
    setSubmitError(null);
  };

  // Save changes
  const handleSave = async (values: any) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      // Get token
      const token = getAuthToken();
      
      // Get option's actual text label
      const getLabelFromValue = (value: string, options: any[]): string => {
        if (!value) return ""; // If value is empty, return empty string
        
        if (options.length > 0 && typeof options[0] === 'object' && options[0].value !== undefined) {
          const option = options.find(opt => opt.value === value);
          return option ? option.label : "";
        }
        return value || "";
      };
      
      // Get major and year's actual label text
      const majorLabel = getLabelFromValue(values.major, formattedMajorOptions);
      const yearLabel = getLabelFromValue(values.year, formattedYearOptions);
      
      // Prepare updated user data
      const updatedUserData = {
        name: values.name,
        username: values.username,
        email: values.email,
        bio: values.bio || "",
        major: majorLabel, // Save label value not value value, empty if not selected
        year: yearLabel, // Save label value not value value, empty if not selected
        age: values.age || 18,
        interests: values.interests || [],
        // Preserve other fields
        firstName: values.name?.split(" ")[0] || "",
        lastName: values.name?.includes(" ") ? values.name?.split(" ").slice(1).join(" ") : "",
        avatar: avatar, // Now avatar stores base64 string
        photos: userData.photos || [],
        location: userData.location || "",
        gender: userData.gender || "",
        genderPreference: userData.genderPreference || [],
      };
      
      // Update user profile using the API function
      await updateUserProfile(updatedUserData, token);
      
      // Update AuthContext user data
      updateUser(
        {
          // Basic user info
          username: values.username,
          email: values.email,
          first_name: updatedUserData.firstName,
          last_name: updatedUserData.lastName,
          profile_picture: avatar
        },
        {
          // Additional profile info
          bio: values.bio || "",
          major: majorLabel, // Use label, empty if not selected
          year: yearLabel, // Use label, empty if not selected
          age: values.age || 18,
          interests: values.interests || [],
          photos: userData.photos || [],
          location: userData.location || "",
          gender: userData.gender || "",
          genderPreference: userData.genderPreference || []
        }
      );
      
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to save settings, please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper shadow="xs" p="md" radius="md" withBorder>
      <form onSubmit={profileForm.onSubmit(handleSave)}>
        <Title order={4} mb="md">Profile Information</Title>
        
        {submitError && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            Error: {submitError}
          </div>
        )}

        <Group align="flex-start" mb="md">
          <Box>
            <Avatar size={100} radius="md" src={avatar} />
            {/* Hidden file upload input box */}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleAvatarChange} 
              style={{ display: "none" }} 
              id="avatar-upload" 
            />
            <Button 
              variant="light" 
              size="xs" 
              mt="xs" 
              leftSection={<IconUpload size={14} />} 
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              Change
            </Button>
          </Box>

          <Stack style={{ flex: 1 }}>
            <TextInput label="Full Name" placeholder="Your name" {...profileForm.getInputProps("name")} />
            <TextInput label="Username" placeholder="Your username" {...profileForm.getInputProps("username")} />
          </Stack>
        </Group>

        <TextInput label="Email" placeholder="Your email" mb="md" {...profileForm.getInputProps("email")} />
        <Textarea label="Bio" placeholder="Tell us about yourself" minRows={3} mb="md" {...profileForm.getInputProps("bio")} />

        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Select 
            label="Major" 
            placeholder="Select your major" 
            data={formattedMajorOptions} 
            {...profileForm.getInputProps("major")} 
          />
          <Select 
            label="Year" 
            placeholder="Select your year" 
            data={formattedYearOptions} 
            {...profileForm.getInputProps("year")} 
          />
          <NumberInput 
            label="Age" 
            placeholder="Your age" 
            min={18} 
            max={100} 
            {...profileForm.getInputProps("age")} 
          />
        </SimpleGrid>

        <MultiSelect 
          label="Interests" 
          placeholder="Select your interests" 
          data={formattedInterestOptions} 
          mt="md" 
          mb="xl" 
          {...profileForm.getInputProps("interests")} 
        />

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={handleCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" loading={isSubmitting}>Save Changes</Button>
        </Group>
      </form>
    </Paper>
  );
}
