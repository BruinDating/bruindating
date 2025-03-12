"use client";

import { SwipeButtonProps } from "./index.d";

export default function SwipeButton({ exit, removeCard, id }: SwipeButtonProps) {
  const handleSwipe = (action: "left" | "right") => {
    exit(action === "left" ? -200 : 200);
    removeCard(id, action);
  };

  return (
    <div className="flex items-center space-x-6 absolute top-10">
      <button onClick={() => handleSwipe("left")} className="px-4 py-2 bg-red-600 text-white rounded-md">
        👎 Left
      </button>
      <button onClick={() => handleSwipe("right")} className="px-4 py-2 bg-green-600 text-white rounded-md">
        ❤️ Right
      </button>
    </div>
  );
}

