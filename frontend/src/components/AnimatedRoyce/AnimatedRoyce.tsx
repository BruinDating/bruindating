"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedRoyceProps {
  className?: string;
}

export const AnimatedRoyce: React.FC<AnimatedRoyceProps> = ({ className = "" }) => {
  // SVG animation properties
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = i * 0.2;
      return {
        pathLength: 1,
        opacity: 0.2, // Very subtle background effect
        transition: {
          pathLength: { delay, type: "spring", duration: 1.8, bounce: 0 },
          opacity: { delay, duration: 0.5 }
        }
      };
    }
  };

  return (
    <motion.svg
      className={`absolute inset-0 w-full h-full ${className}`}
      initial="hidden"
      animate="visible"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main Building Structure */}
      <motion.rect
        x="200" 
        y="200" 
        width="600" 
        height="350"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={0}
      />
      
      {/* Left Tower */}
      <motion.rect
        x="250" 
        y="130" 
        width="150" 
        height="70"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={1}
      />
      
      {/* Right Tower */}
      <motion.rect
        x="600" 
        y="130" 
        width="150" 
        height="70"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={1}
      />
      
      {/* Left Tower Top */}
      <motion.rect
        x="280" 
        y="70" 
        width="90" 
        height="60"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={2}
      />
      
      {/* Right Tower Top */}
      <motion.rect
        x="630" 
        y="70" 
        width="90" 
        height="60"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={2}
      />
      
      {/* Main Entrance */}
      <motion.rect
        x="470" 
        y="400" 
        width="60" 
        height="150"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={3}
      />
      
      {/* Decorative Arches - Left Side */}
      <motion.path
        d="M280 350 C300 330, 340 330, 360 350"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={4}
      />
      
      {/* Decorative Arches - Right Side */}
      <motion.path
        d="M640 350 C660 330, 700 330, 720 350"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={4}
      />
      
      {/* Steps */}
      <motion.line
        x1="400"
        y1="550"
        x2="600"
        y2="550"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={5}
      />
      
      <motion.line
        x1="380"
        y1="560"
        x2="620"
        y2="560"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeOpacity="0.5"
        variants={draw}
        custom={5.2}
      />
    </motion.svg>
  );
};

export default AnimatedRoyce; 