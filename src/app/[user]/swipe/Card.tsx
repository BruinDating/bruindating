"use client";

import { CardProps } from "./index.d";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import SwipeButton from "./SwipeButton";



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

  return (
    <>
      <SwipeButton exit={setExitX} removeCard={removeCard} id={data.id} />
      {active ? (
        <motion.div
          drag="x"
          className="card-container flex flex-col bg-white shadow-xl border border-gray-300 rounded-lg overflow-hidden w-[320px] h-[500px] p-4"
          onDragEnd={dragEnd}
          style={{ x, rotate, opacity }}
          transition={{ type: "tween", duration: 0.3, ease: "easeIn" }}
          exit={{ x: exitX }}
        >
          <div className="relative h-[270px] w-full overflow-hidden rounded-t-lg">
            <img
              src={typeof data.src === "string" ? data.src : "/default-profile.png"}
              alt="Profile Picture"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 text-center">
            <p className="text-xl font-bold text-gray-900">{data.name}</p>
            <p className="text-sm text-gray-600">{data.bio}</p>
            <div className="flex justify-center gap-2 mt-3">
              {data.genre.map((item, idx) => (
                <p key={idx} className="rounded-full bg-teal-700 text-white px-3 py-1 text-sm">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default Card;
