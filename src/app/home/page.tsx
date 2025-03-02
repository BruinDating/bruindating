"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import PhotoStorage from "@/components/home/PhotoStorage";

export default function HomePage() {
    // Make sure `useState` is called inside components
    const [photos, setPhotos] = useState<string[]>(Array(10).fill(null)); // default 10 empty slots
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // store the selected index
    const menuRef = useRef<HTMLDivElement | null>(null); // bind the menu ref
    const photoRefs = useRef<(HTMLDivElement | null)[]>(new Array(10).fill(null)); // store the photo refs
    // When the component loads, read the local storage data
    useEffect(() => {
        setPhotos(PhotoStorage.getPhotos());
    }, []);

    // Close the menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;

            // If the click is inside the menu, do nothing
            if (menuRef.current && menuRef.current.contains(target)) return;

            // If the click is inside the photo, do nothing
            if (photoRefs.current.some(ref => ref && ref.contains(target))) return;

            // Otherwise, close the menu
            setSelectedIndex(null);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle the upload
    const handleUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);

            const newPhotos = [...photos];
            newPhotos[index] = imageUrl; // update the photo
            setPhotos(newPhotos);
            PhotoStorage.savePhotos(newPhotos); // sync with localStorage
            setSelectedIndex(null); // close the menu
        }
    };

    // Handle the delete
    const handleDelete = (index: number) => {
        const newPhotos = [...photos];
        newPhotos[index] = ""; // clear the photo
        setPhotos(newPhotos);
        PhotoStorage.savePhotos(newPhotos); // sync with localStorage
        setSelectedIndex(null); // close the menu
    };

    // Set the photo refs
    const setPhotoRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
        photoRefs.current[index] = el;
    }, []);

    return (
        <main className="flex flex-col items-center bg-pink-100 min-h-screen p-6">
            {/* 🔙 Return Button */}
            <button
                className="absolute top-4 left-4 bg-pink-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-pink-300 transition"
                onClick={() => window.history.back()}
            >
                ← Return
            </button>


            <h1 className="text-2xl font-bold text-gray-800 mb-4">Photo Wall</h1>

            {/* Photo wall */}
            <div className="grid grid-cols-5 gap-x-12 gap-y-12 bg-pink-200 p-6 px-12 rounded-lg shadow-md">
                {photos.map((photo, index) => (
                    <div key={index} className="relative flex flex-col items-center">
                        {/* photo box */}
                        <div
                            className="w-60 h-80 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center shadow-md cursor-pointer relative"
                            ref={setPhotoRef(index)} // bind the ref
                            onClick={() => {
                                if (selectedIndex === index) {
                                    setSelectedIndex(null); // if the same photo is clicked, close the menu
                                } else {
                                    setSelectedIndex(index); // otherwise, open the menu
                                }
                            }}
                        >
                            {photo ? (
                                <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <label className="cursor-pointer flex items-center justify-center w-full h-full text-4xl text-gray-500">
                                    ➕
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(index, e)} />
                                </label>
                            )}

                            {/* Pop the menu */}
                            {selectedIndex === index && photo && (
                                <div
                                    ref={menuRef}  // bind the ref
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg p-2"
                                >
                                    <button
                                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                        onClick={() => {
                                            document.getElementById(`fileInput-${index}`)?.click();
                                            setSelectedIndex(null); // close the menu
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Hide upload button */}
                        <input
                            id={`fileInput-${index}`}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUpload(index, e)}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
