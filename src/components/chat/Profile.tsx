"use client";
import { useState } from "react";
import type { User } from "@/app/chat/page";

export default function Profile({
    name,
    country,
    age,
    height,
    religion,
    status,
    Hobbies,
    imageUrl
}: User) {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <>
            {/* Click on the avatar to zoom out */}
            {isZoomed && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    onClick={() => setIsZoomed(false)}
                >
                    <img 
                        src={imageUrl} 
                        alt="Profile" 
                        className="rounded-full w-[500px] h-[500px] border-4 border-white shadow-lg transition-all duration-300 transform -translate-y-10"
                    />
                </div>
            )}

            {/* Profile  side bar*/}
            <aside className="w-1/4 bg-pink-100 p-6 text-gray-700 min-h-screen flex flex-col items-center">
                {/* top bar */}
                <div className="flex items-center justify-between w-full px-4">
                    <span className="text-red-500 text-2xl">❤️</span>
                    <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">Profile</h2>
                </div>

                {/* Avatar */}
                <div 
                    className="relative mt-12 cursor-pointer transition-all duration-300"
                    onClick={() => setIsZoomed(true)}
                >
                    <img 
                        src={imageUrl} 
                        alt="Profile" 
                        className="rounded-full w-32 h-32 border-4 border-white shadow-lg transition-all duration-300"
                    />
                </div>

                {/* info */}
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
        </>
    );
}
