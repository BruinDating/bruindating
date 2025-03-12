"use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import SwipeButton from "./SwipeButton";

interface CardData {
  id: number;
  name: string;
  age: number;
  gender: string;
  major: string;
  hobbies: string[];
  profile_picture: string | null;
}

interface CardProps {
  data: CardData;
  active: boolean;
  removeCard: (id: number, direction: "left" | "right") => void;
}

const Card = ({ data, active, removeCard }: CardProps) => {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -125, 0, 125, 200], [0, 1, 1, 1, 0]);

  const dragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      setExitX(200);
      removeCard(data.id, "right");
    } else if (info.offset.x < -100) {
      setExitX(-200);
      removeCard(data.id, "left");
    }
  };

  const getProfilePicture = (profilePicture: string | null) => {
    if (!profilePicture) {
      return "/default-profile.png";
    }
    // If it's a full URL, use it as is
    if (profilePicture.startsWith('http')) {
      return profilePicture;
    }
    // Otherwise, prepend the backend URL
    return `http://127.0.0.1:8000${profilePicture}`;
  };

  // Always render the card, but use opacity and position to handle active state
  return (
    <>
      <SwipeButton exit={setExitX} removeCard={removeCard} id={data.id} />
      <motion.div
        drag="x"
        className="card-container flex flex-col bg-white shadow-xl border border-gray-300 rounded-lg overflow-hidden w-[320px] h-[500px]"
        onDragEnd={dragEnd}
        style={{ x, rotate, opacity }}
        transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
        exit={{ x: exitX }}
      >
        <div className="relative h-[270px] w-full overflow-hidden">
          <img
            src={getProfilePicture(data.profile_picture)}
            alt={`${data.name}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.log('Image failed to load:', data.profile_picture);
              e.currentTarget.src = "/default-profile.png";
            }}
          />
        </div>

        <div className="p-4 text-center">
          <p className="text-xl font-bold text-gray-900">{data.name}, {data.age}</p>
          <p className="text-sm text-gray-600">{data.major} • {data.gender}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {data.hobbies.map((hobby, idx) => (
              <p key={idx} className="rounded-full bg-teal-700 text-white px-3 py-1 text-sm">
                {hobby}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Card;