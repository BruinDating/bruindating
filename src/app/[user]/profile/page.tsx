"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Tabs,
  TabsList,
  TabsTab,
  Loader,
  Center,
  Text,
} from "@mantine/core";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import About from "@/components/Profile/About";
import Interests from "@/components/Profile/Interests";
import Photos from "@/components/Profile/Photos";
import { fetchProfileData } from "@/services/api";
import { useAuth } from "@/components/Auth/AuthContext";
import { profileDataProps } from "@/types/types";
import { useParams, useRouter, usePathname } from "next/navigation";

export default function ProfilePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState<profileDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const username = params.user as string;

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // First try to use user data from AuthContext
        if (user && user.username === username) {
          // Convert AuthContext user data to profileDataProps format
          const authContextUserData: profileDataProps = {
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            avatar: user.profile_picture || "",
            // Required fields, use default values
            age: 21,
            bio: "",
            major: "",
            year: "",
            interests: [],
            photos: [],
            location: "",
            gender: "",
            genderPreference: [],
          };
          
          // Try to get more details from localStorage
          if (process.env.NODE_ENV === 'development') {
            try {
              // Read from localStorage key-value pairs
              // ... (rest of the code stays the same)
            } catch (error) {
              console.error("Error reading from localStorage:", error);
            }
          }
          
          setProfileData(authContextUserData);
          setLoading(false);
          return;
        }
        
        // If AuthContext doesn't have complete data, fetch from API
        const token = localStorage.getItem('access_token');
        if (!token) {
          throw new Error("Not authenticated");
        }
        
        // ... (rest of the code stays the same)
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, username, pathname]);

  useEffect(() => {
    // Get additional user profile data from localStorage
    if (profileData && process.env.NODE_ENV === 'development') {
      try {
        // Try to get persisted user data from localStorage
        // ... (rest of the code stays the same)
        
        // Use original values, don't add defaults, keep possible empty values
        // ... (rest of the code stays the same)
      } catch (error) {
        console.error("Error enhancing profile data from localStorage:", error);
      }
    }
  }, [profileData]);

  if (loading) {
    return (
      <Center h="50vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (error || !profileData) {
    return (
      <Center h="50vh">
        <Text c="red">{error || "Failed to load profile data"}</Text>
      </Center>
    );
  }
  
  console.log({ profileData });
  
  return (
    <Container size="lg" py="xl">
      <ProfileHeader profileData={profileData} />
      <Tabs defaultValue="about">
        <TabsList mb="md">
          <TabsTab value="about">About</TabsTab>
          <TabsTab value="photos">Photos</TabsTab>
          <TabsTab value="interests">Interests</TabsTab>
        </TabsList>
        <About profileData={profileData} />
        <Photos profileData={profileData} />
        <Interests profileData={profileData} />
      </Tabs>
    </Container>
  );
}
