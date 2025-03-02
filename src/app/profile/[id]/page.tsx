"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// simulate friend photos
const friendPhotos: { [key: string]: string[] } = {
    "1": [
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/men/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/men/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
        "https://randomuser.me/api/portraits/men/10.jpg",
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/men/12.jpg",
        "https://randomuser.me/api/portraits/men/13.jpg",
        "https://randomuser.me/api/portraits/men/14.jpg",
    ],
    "2": [
        "https://randomuser.me/api/portraits/women/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/women/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg",
        "https://randomuser.me/api/portraits/women/7.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
        "https://randomuser.me/api/portraits/women/9.jpg",
        "https://randomuser.me/api/portraits/women/10.jpg",
        "https://randomuser.me/api/portraits/women/11.jpg",
        "https://randomuser.me/api/portraits/women/12.jpg",
    ],
    "3": [
        "https://randomuser.me/api/portraits/men/20.jpg",
        "https://randomuser.me/api/portraits/men/21.jpg",
        "https://randomuser.me/api/portraits/men/22.jpg",
        "https://randomuser.me/api/portraits/men/23.jpg",
        "https://randomuser.me/api/portraits/men/24.jpg",
        "https://randomuser.me/api/portraits/men/25.jpg",
        "https://randomuser.me/api/portraits/men/26.jpg",
        "https://randomuser.me/api/portraits/men/27.jpg",
        "https://randomuser.me/api/portraits/men/28.jpg",
        "https://randomuser.me/api/portraits/men/29.jpg",
    ],
    "4": [
        "https://randomuser.me/api/portraits/women/13.jpg",
        "https://randomuser.me/api/portraits/women/14.jpg",
        "https://randomuser.me/api/portraits/women/15.jpg",
        "https://randomuser.me/api/portraits/women/16.jpg",
        "https://randomuser.me/api/portraits/women/17.jpg",
        "https://randomuser.me/api/portraits/women/18.jpg",
        "https://randomuser.me/api/portraits/women/19.jpg",
        "https://randomuser.me/api/portraits/women/20.jpg",
        "https://randomuser.me/api/portraits/women/21.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
    ],
    "5": [
        "https://randomuser.me/api/portraits/men/30.jpg",
        "https://randomuser.me/api/portraits/men/31.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/men/33.jpg",
        "https://randomuser.me/api/portraits/men/34.jpg",
        "https://randomuser.me/api/portraits/men/35.jpg",
        "https://randomuser.me/api/portraits/men/36.jpg",
        "https://randomuser.me/api/portraits/men/37.jpg",
        "https://randomuser.me/api/portraits/men/38.jpg",
        "https://randomuser.me/api/portraits/men/39.jpg",
    ],
};

export default function FriendProfile() {
    const { id } = useParams(); // get the friend id from the URL
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);

    if (!id) {
        return <p className="text-center text-gray-700">Loading...</p>;
    }

    // get the friend's photos
    const photos = friendPhotos[id as string] || new Array(10).fill(null);

    return (
        <main className="flex flex-col items-center bg-pink-100 min-h-screen p-6">
            {/* 🔙 Return button */}
            <button
                className="absolute top-4 left-4 bg-pink-200 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-pink-300 transition"
                onClick={() => window.history.back()}
            >
                ← Return
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">Friend's Photo Wall</h1>

            {/* Zoom out photo */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setZoomedImage(null)}
                >
                    <img
                        src={zoomedImage}
                        alt="Zoomed"
                        className="rounded-lg w-[500px] h-[500px] border-4 border-white shadow-lg"
                    />
                </div>
            )}

            {/* Photo wall */}
            <div className="grid grid-cols-5 gap-x-12 gap-y-12 bg-pink-200 p-6 px-12 rounded-lg shadow-md">
                {photos.map((photo, index) => (
                    <div key={index} className="relative flex flex-col items-center">
                        {/* Photo nox */}
                        <div
                            className="w-60 h-80 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center shadow-md relative"
                        >
                            {photo ? (
                                <Image
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                    width={240}
                                    height={320}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                                    onClick={() => setZoomedImage(photo)} // zoom in the photo
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl">
                                    📷
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
