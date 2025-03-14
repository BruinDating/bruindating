import { UserData } from "@/types/types";
import { notifications } from "@mantine/notifications";

export function SendData({ updateUser }: { updateUser: UserData }) {
  const handleSettingsUpdate = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

      const profileData = {
        bio: updateUser.bio || "",
        major: updateUser.major || "",
        year: updateUser.year || "",
        age: updateUser.age || 18,
        interests: updateUser.interests || [],
        photos: updateUser.photos || [],
        location: "",
        gender:
          updateUser.dpShowMe === "women"
            ? "male"
            : updateUser.dpShowMe === "men"
            ? "female"
            : "",
        gender_preference: updateUser.dpShowMe ? [updateUser.dpShowMe] : [],
      };

      const response = await fetch(`${API_URL}/profiles/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Profile update failed:", response.status, errorData);
        throw new Error(`Failed to update profile: ${response.statusText}`);
      }

      notifications.show({
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
        color: "green",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      notifications.show({
        title: "Update Failed",
        message: "Failed to update profile. Please try again.",
        color: "red",
      });
    }
  };

  handleSettingsUpdate();
}
