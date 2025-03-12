"use client";

import Card from "./Card";
import { CardData } from "./index.d";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./style.css";

// Profile interface
interface Profile {
  id: number;
  email: string;
  name: string;
  bio: string;
  major: string;
  year: string;
  interests: string[];
  location: string;
  gender: string;
}

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [swipedIds, setSwipedIds] = useState<Set<number>>(new Set());
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/profiles/")
      .then((response) => response.json())
      .then((profiles: Profile[]) => {
        // Filter out the current user's profile and already swiped profiles
        const currentUserEmail = "jasonvu8@ucla.edu"; // Replace with actual logged-in user email
        const filteredProfiles = profiles.filter(
          (profile) =>
            profile.email !== currentUserEmail && !swipedIds.has(profile.id)
        );

        const formattedData = filteredProfiles.map((profile) => ({
          id: profile.id,
          name: profile.name || profile.email.split("@")[0],
          src: "/default-profile.png",
          bio: profile.bio || "",
          genre: profile.interests || [],
          major: profile.major || "",
          year: profile.year || "",
        }));
        setCards(formattedData);
        // Set active index to the last card
        setActiveIndex(formattedData.length > 0 ? formattedData[formattedData.length - 1].id : null);
      })
      .catch((error) => console.error("Error fetching profiles:", error));
  }, [swipedIds]); // Re-fetch when swipedIds changes

  const removeCard = (id: number, action: "right" | "left") => {
    setSwipedIds(prev => new Set([...prev, id]));
    
    fetch("http://127.0.0.1:8000/api/matching/swipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        user_id: id, 
        action: action === "right" ? "like" : "dislike",
        swiper_email: "jasonvu8@ucla.edu"  // Add this line
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Swipe response:", data);  // Add this to see the response
    })
    .catch((error) => console.error("Error sending swipe:", error));
  
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-black">
      <AnimatePresence>
        {cards.length ? (
          cards.map((card) => (
            <Card
              key={card.id}
              data={card}
              active={card.id === activeIndex}
              removeCard={removeCard}
            />
          ))
        ) : (
          <h2 className="absolute z-10 text-center text-2xl font-bold">
            No more cards left! Come back later.
          </h2>
        )}
      </AnimatePresence>
    </div>
  );
}