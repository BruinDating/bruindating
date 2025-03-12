"use client";

import Card from "./Card";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import "./style.css";

// Profile interface
interface Profile {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: string;
  major: string;
  profile_picture: string | null;
  hobbies: string;
}

// Update CardData to match our new structure
interface CardData {
  id: number;
  name: string;
  age: number;
  gender: string;
  major: string;
  hobbies: string[];
  profile_picture: string;
}

export default function Home() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profiles only once when component mounts
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://127.0.0.1:8000/api/profiles/");
        const profiles: Profile[] = await response.json();
        
        console.log('Fetched profiles:', profiles);

        const currentUserEmail = "jasonvu8@ucla.edu";
        const filteredProfiles = profiles.filter(
          (profile) => profile.email !== currentUserEmail
        );

        const formattedData = filteredProfiles.map((profile) => ({
          id: profile.id,
          name: profile.name,
          age: profile.age,
          gender: profile.gender,
          major: profile.major,
          hobbies: profile.hobbies.split(',').map(hobby => hobby.trim()),
          profile_picture: profile.profile_picture || '/images/default-profile.png'
        }));

        console.log('Formatted profiles:', formattedData);
        
        setCards(formattedData);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const removeCard = (id: number, action: "right" | "left") => {
    // Move to next card
    setActiveIndex(prev => prev + 1);
    
    fetch("http://127.0.0.1:8000/api/matching/swipe/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        user_id: id, 
        action: action === "right" ? "like" : "dislike",
        swiper_email: "jasonvu8@ucla.edu"
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Swipe response:", data);
    })
    .catch((error) => console.error("Error sending swipe:", error));
  };

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white text-black">
      <div className="relative w-[320px] h-[500px]">
        <AnimatePresence>
          {isLoading ? (
            <h2 className="absolute z-10 text-center text-2xl font-bold">
              Loading profiles...
            </h2>
          ) : cards.length > activeIndex ? (
            <Card
              key={cards[activeIndex].id}
              data={cards[activeIndex]}
              active={true}
              removeCard={removeCard}
            />
          ) : (
            <h2 className="absolute z-10 text-center text-2xl font-bold">
              No more cards left! Come back later.
            </h2>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}