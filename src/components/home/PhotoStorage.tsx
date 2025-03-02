"use client";

const LOCAL_STORAGE_KEY = "photoWall";
const AVATAR_KEY = "avatar";

const PhotoStorage = {
    // get photos from localStorage
    getPhotos: (): string[] => {
        if (typeof window !== "undefined") {
            const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
            return storedPhotos ? JSON.parse(storedPhotos) : Array(10).fill(null);
        }
        return Array(10).fill(null);
    },

    // save photos to localStorage
    savePhotos: (photos: string[]) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
        }
    },

    // clear photos from localStorage
    clearPhotos: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    },

    // backkend API
    /*
    async fetchPhotosFromAPI(): Promise<string[]> {
        try {
            const response = await fetch("/api/photos");
            if (!response.ok) throw new Error("Failed to fetch photos");
            return await response.json();
        } catch (error) {
            console.error("Error fetching photos:", error);
            return Array(10).fill(null);
        }
    },

    async savePhotosToAPI(photos: string[]) {
        try {
            await fetch("/api/photos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photos }),
            });
        } catch (error) {
            console.error("Error saving photos:", error);
        }
    }
    */

    // get avatar from localStorage
    getAvatar: (): string | null => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(AVATAR_KEY) || null;
        }
        return null;
    },

    // save avatar to localStorage
    saveAvatar: (avatarUrl: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem(AVATAR_KEY, avatarUrl);
        }
    },

    // clear avatar from localStorage
    clearAvatar: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem(AVATAR_KEY);
        }
    },

    // backkend API
    /*
    async fetchPhotosFromAPI(): Promise<string[]> {
        try {
            const response = await fetch("/api/photos");
            if (!response.ok) throw new Error("Failed to fetch photos");
            return await response.json();
        } catch (error) {
            console.error("Error fetching photos:", error);
            return Array(10).fill(null);
        }
    },
    */

    // backkend API
    /*
    async savePhotosToAPI(photos: string[]) {
        try {
            await fetch("/api/photos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ photos }),
            });
        } catch (error) {
            console.error("Error saving photos:", error);
        }
    }
    */

    // backkend API
    /*
    async uploadAvatar(file: File): Promise<string | null> {
        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const response = await fetch("/api/uploadAvatar", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.avatarUrl;
        } catch (error) {
            console.error("Upload failed:", error);
            return null;
        }
    }
    */
};

export default PhotoStorage;
