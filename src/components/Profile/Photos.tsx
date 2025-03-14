import {
  TabsPanel,
  Paper,
  Group,
  Title,
  Button,
  Grid,
  GridCol,
  Card,
  CardSection,
  ActionIcon,
  Text,
  Image,
  Center,
  FileButton,
  Stack,
  Box,
} from "@mantine/core";
import { IconCamera, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { profileDataProps } from "@/types/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/components/Auth/AuthContext";
import { updateUserProfile } from "@/services/api";

const Photos = ({ profileData }: { profileData: profileDataProps }) => {
  const params = useParams();
  const username = params.user as string;
  const { user, updateUser } = useAuth();
  
  // State management
  const [photos, setPhotos] = useState<string[]>(profileData.photos || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // File upload reference
  const resetRef = useRef<() => void>(null);
  
  // Create fixed 10 slots array
  const MAX_PHOTOS = 10;
  const photoSlots = Array(MAX_PHOTOS).fill(null);
  
  // Handle photo loading on component mount
  useEffect(() => {
    // Photos are now stored directly in profileData.photos
    if (profileData.photos && profileData.photos.length > 0) {
      setPhotos(profileData.photos);
    } else {
      try {
        const photosStr = localStorage.getItem('user_photos');
        if (photosStr) {
          const parsedPhotos = JSON.parse(photosStr);
          if (Array.isArray(parsedPhotos) && parsedPhotos.length > 0) {
            setPhotos(parsedPhotos);
          }
        }
        
        // If no photos in user_photos, try from mockUserProfile
        const mockUserProfileStr = localStorage.getItem('mockUserProfile');
        if (mockUserProfileStr) {
          const userData = JSON.parse(mockUserProfileStr);
          if (userData.photos && Array.isArray(userData.photos) && userData.photos.length > 0) {
            setPhotos(userData.photos);
          }
        }
      } catch (error) {
        console.error("Failed to parse photos data:", error);
      }
    }
  }, [profileData.photos]);
  
  // Save photos to backend
  const savePhotosToBackend = async (newPhotos: string[]) => {
    try {
      setIsUploading(true);
      setIsSyncing(true);
      
      // Filter out empty strings
      const validPhotos = newPhotos.filter(photo => photo && photo !== "");
      
      // Simplify storage approach - skip references and store photos directly in mockUserProfile
      // 1. Get current mockUserProfile
      const mockUserProfile = localStorage.getItem('mockUserProfile');
      if (mockUserProfile) {
        try {
          const userData = JSON.parse(mockUserProfile);
          
          // 2. Update photos directly (no references)
          userData.photos = validPhotos;
          
          // 3. Save back to localStorage
          try {
            localStorage.setItem('mockUserProfile', JSON.stringify(userData));
          } catch (e) {
            console.error('Failed to save to mockUserProfile, possibly storage limit exceeded:', e);
            throw e;
          }
          
          // 4. Separately store photo data
          try {
            localStorage.setItem('user_photos', JSON.stringify(validPhotos));
          } catch (e) {
            console.error('Failed to save to user_photos, possibly storage limit exceeded:', e);
            throw e;
          }
          
          // 5. If needed, also update AuthContext
          if (updateUser) {
            updateUser(
              { 
                username: profileData.username,
              },
              {
                photos: validPhotos
              }
            );
          }
          
          // 6. Update API
          const token = localStorage.getItem("access_token");
          const updatedUserData = {
            ...profileData,
            photos: validPhotos
          };
          await updateUserProfile(updatedUserData, token);
          
          return validPhotos;
        } catch (error) {
          console.error('Failed to update user profile', error);
          throw error;
        }
      } else {
        // Create mockUserProfile if it doesn't exist
        try {
          const newProfile = {
            ...profileData,
            photos: validPhotos
          };
          localStorage.setItem('mockUserProfile', JSON.stringify(newProfile));
          
          // Separately store photos
          localStorage.setItem('user_photos', JSON.stringify(validPhotos));
          
          return validPhotos;
        } catch (error) {
          console.error('Failed to create user profile', error);
          throw error;
        }
      }
    } catch (error) {
      console.error("Failed to save photos:", error);
      throw error;
    } finally {
      setIsUploading(false);
      setIsSyncing(false);
    }
  };
  
  // Handle photo upload
  const handlePhotoUpload = (file: File | null, index: number | null) => {
    if (!file) return;
    
    // Show uploading status
    setIsUploading(true);
    
    // Create a function to compress image to a much smaller size
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
          
          // Calculate dimensions for traditional rectangular format
          // Set a fixed aspect ratio (e.g., 4:3 for traditional photo)
          const ASPECT_RATIO = 4/3;
          
          // Use smaller maximum dimensions to reduce file size
          const MAX_WIDTH = 640;  // reduced from 800
          const MAX_HEIGHT = 480; // reduced from 600
          
          let width = img.width;
          let height = img.height;
          
          // Adjust dimensions to maintain aspect ratio
          if (width / height > ASPECT_RATIO) {
            // If image is wider than aspect ratio
            height = width / ASPECT_RATIO;
          } else {
            // If image is taller than aspect ratio
            width = height * ASPECT_RATIO;
          }
          
          // Scale down if too large
          if (width > MAX_WIDTH) {
            height = (MAX_WIDTH / width) * height;
            width = MAX_WIDTH;
          }
          
          if (height > MAX_HEIGHT) {
            width = (MAX_HEIGHT / height) * width;
            height = MAX_HEIGHT;
          }
          
          // Set canvas size
          canvas.width = width;
          canvas.height = height;
          
          // Draw the compressed image
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
          
            // Convert to lower quality JPEG (reduced quality for smaller size)
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6); // 60% quality JPEG
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
    
    // Compress and process image
    compressImage(file).then(compressedImage => {
      let newPhotos = [...photos];
      
      if (index !== null && index >= 0 && index < MAX_PHOTOS) {
        // Replace photo at specific position
        // Ensure array length is sufficient
        while (newPhotos.length <= index) {
          newPhotos.push("");
        }
        newPhotos[index] = compressedImage;
      } else {
        // Add to first empty slot
        const emptyIndex = newPhotos.findIndex(p => !p);
        if (emptyIndex >= 0) {
          newPhotos[emptyIndex] = compressedImage;
        } else if (newPhotos.length < MAX_PHOTOS) {
          newPhotos.push(compressedImage);
        } else {
          console.error(`Maximum number of photos (${MAX_PHOTOS}) reached`);
          setIsUploading(false);
          resetRef.current?.();
          return;
        }
      }
      
      // Update state with new photos
      setPhotos(newPhotos);
      
      // Auto-save after upload
      savePhotosToBackend(newPhotos).then(() => {
        setIsUploading(false);
        resetRef.current?.();
      }).catch(error => {
        console.error("Failed to save photos:", error);
        setIsUploading(false);
        resetRef.current?.();
      });
    }).catch(error => {
      console.error("Error processing image:", error);
      setIsUploading(false);
      resetRef.current?.();
    });
  };
  
  // Delete photo
  const handleDeletePhoto = (index: number) => {
    // Create new photos array
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    
    // Add empty string to maintain array length
    while (newPhotos.length < photos.length) {
      newPhotos.push("");
    }
    
    // Update state
    setPhotos(newPhotos);
    
    // Auto-save after deletion
    savePhotosToBackend(newPhotos).then(() => {
      // Saving successful
    }).catch(error => {
      console.error("Failed to save photos after deletion:", error);
    });
  };
  
  // Render photo or add photo button
  const renderPhotoSlot = (index: number) => {
    const photoContent = photos[index] || '';
    
    if (photoContent && photoContent !== "") {
      // Has photo, show photo and action buttons
      return (
        <Card shadow="sm" padding="xs" radius="md" withBorder>
          <CardSection>
            <Image
              src={photoContent}
              height={160}
              width={213} // For 4:3 aspect ratio at 160px height
              fit="cover"
              alt={`Photo ${index + 1}`}
              fallbackSrc="https://placehold.co/213x160?text=Failed+to+load"
            />
          </CardSection>
          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Photo {index + 1}</Text>
            <Group gap="xs">
              <FileButton 
                onChange={(file) => handlePhotoUpload(file, index)} 
                accept="image/png,image/jpeg,image/webp"
                resetRef={resetRef}
              >
                {(props) => (
                  <ActionIcon 
                    {...props}
                    variant="subtle" 
                    color="blue" 
                    loading={isUploading}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                )}
              </FileButton>
              <ActionIcon 
                variant="subtle" 
                color="red" 
                onClick={() => handleDeletePhoto(index)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Group>
        </Card>
      );
    } else {
      // Empty slot, show add button
      return (
        <Card 
          shadow="sm" 
          padding="xs" 
          radius="md" 
          withBorder 
          style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <Center style={{ height: '160px' }}>
            <FileButton 
              onChange={(file) => handlePhotoUpload(file, index)} 
              accept="image/png,image/jpeg,image/webp"
              resetRef={resetRef}
            >
              {(props) => (
                <Button 
                  {...props}
                  variant="light" 
                  leftSection={<IconPlus size={16} />}
                  loading={isUploading}
                >
                  Add Photo
                </Button>
              )}
            </FileButton>
          </Center>
        </Card>
      );
    }
  };

  return (
    <TabsPanel value="photos">
      <Paper p="md" shadow="xs" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Photos</Title>
          {isSyncing && <Text c="blue" size="sm">Syncing to server...</Text>}
        </Group>

        <Grid>
          {photoSlots.map((_, index) => (
            <GridCol span={{ base: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
              {renderPhotoSlot(index)}
            </GridCol>
          ))}
        </Grid>
      </Paper>
    </TabsPanel>
  );
};

export default Photos;
