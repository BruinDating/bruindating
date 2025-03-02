"use client";
import { useState, useEffect, useRef } from "react";
import type { User } from "@/app/chat/page";
import { useRouter } from "next/navigation";
import PhotoStorage from "@/components/home/PhotoStorage";
import cropImage from "@/components/home/cropImage"; // import the image cropper

export default function Profile({
    name,
    country,
    age,
    height,
    religion,
    status,
    Hobbies,
    imageUrl,
    setUser, // add the setUser function
}: User & { setUser: (user: User) => void }) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    // use the `useState` hook to manage the avatar state
    const [avatar, setAvatar] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //replace the `useState` hook with the `useState` hook
    const [userData, setUserData] = useState({
        name,
        country,
        age,
        height,
        religion,
        status,
        Hobbies,
    });

    // temporary user data for editing
    const [tempUserData, setTempUserData] = useState(userData);

    // ensure the `useEffect` hook is called only on the client
    useEffect(() => {
        const storedAvatar = PhotoStorage.getAvatar();
        setAvatar(storedAvatar || imageUrl); // set the avatar from the storage
    }, [imageUrl]); // update the avatar when the imageUrl changes

    // save the avatar to the storage when the avatar changes
    useEffect(() => {
        if (avatar && avatar.startsWith("data:image")) {
            PhotoStorage.saveAvatar(avatar);
        }
    }, [avatar]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false); // close the menu when clicking outside
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // process the avatar change
    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64Image = reader.result as string; // get the base64 image
                try {
                    const pixelCrop = { x: 50, y: 50, width: 200, height: 200 };
                    const croppedImage = await cropImage(base64Image, pixelCrop);

                    setAvatar(croppedImage);
                    setMenuOpen(false); // close the menu

                    // clear the file input
                    if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                    }
                } catch (error) {
                    console.error("Avatar cropping failed:", error);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    // handle the input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTempUserData((prev) => ({ ...prev, [name]: value }));
    };

    // save the profile
    const handleSaveProfile = () => {
        const updatedUser = { ...tempUserData, imageUrl: avatar || imageUrl };
        setUser(updatedUser); // update the user state
        localStorage.setItem("user", JSON.stringify(updatedUser)); //save the user to localStorage
        setEditOpen(false); // close the edit modal
    };

    // cancel the edit
    const handleCancelEdit = () => {
        setTempUserData(userData); // reset the temp user data
        setEditOpen(false); // close the edit modal
    };

    return (
        <>
            {isZoomed && avatar && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setIsZoomed(false)}
                >
                    <img
                        src={avatar}
                        alt="Profile"
                        className="rounded-full w-[500px] h-[500px] border-4 border-white shadow-lg transition-all duration-300 transform -translate-y-10"
                    />
                </div>
            )}

            <aside className="w-1/4 bg-pink-100 p-6 text-gray-700 min-h-screen flex flex-col items-center">
                <div className="flex items-center justify-between w-full px-4 relative">
                    <span className="text-red-500 text-2xl">❤️</span>
                    <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">Profile</h2>

                    <div className="relative" ref={menuRef}>
                        <button
                            className="text-gray-600 text-2xl focus:outline-none"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            ...
                        </button>

                        {menuOpen && (
                            <div className="absolute left-1/2 top-full mt-2 w-48 bg-white border rounded-lg shadow-lg transform -translate-x-1/3">
                                <ul className="py-2 text-gray-700">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => router.push("/home")}
                                    >
                                        Home Page
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            fileInputRef.current?.click();  // open the file input
                                            setMenuOpen(false);  // close the menu
                                        }}
                                    >
                                        Avatar
                                    </li>
                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setEditOpen(true);  // open the edit modal
                                            setMenuOpen(false);  // close the menu
                                        }}
                                    >
                                        Edit Profile
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className="relative mt-12 cursor-pointer transition-all duration-300"
                    onClick={() => setIsZoomed(true)}
                >
                    {avatar ? (
                        <img
                            src={avatar}
                            alt="Profile"
                            className="rounded-full w-32 h-32 border-4 border-white shadow-lg transition-all duration-300"
                        />
                    ) : (
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-500">Loading...</span>
                        </div>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                />

                <ul className="mt-12 space-y-4 text-lg w-full text-left px-16">
                    <li><strong className="text-gray-900">Name:</strong> {name}</li>
                    <li><strong className="text-gray-900">Country:</strong> {country}</li>
                    <li><strong className="text-gray-900">Age:</strong> {age} Years</li>
                    <li><strong className="text-gray-900">Height:</strong> {height}</li>
                    <li><strong className="text-gray-900">Religion:</strong> {religion}</li>
                    <li><strong className="text-gray-900">Civil Status:</strong> {status}</li>
                    <li><strong className="text-gray-900">Caste:</strong> {Hobbies}</li>
                </ul>
            </aside>
            {/* 🚀 Edit Profile Modal */}
            {editOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                        {Object.keys(userData).map((key) => (
                            <div key={key} className="mb-3">
                                <label className="block text-sm font-medium text-gray-700">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                <input
                                    type="text"
                                    name={key}
                                    value={(tempUserData as any)[key]}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        ))}

                        <div className="flex justify-end space-x-2">
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleCancelEdit}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleSaveProfile}>Save</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}