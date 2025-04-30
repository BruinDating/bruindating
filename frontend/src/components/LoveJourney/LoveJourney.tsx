"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Badge, Text, Title, Box, Container } from "@mantine/core";
import React from "react";

type JourneyStep = {
  id: number;
  title: string;
  description: string;
  position: "left" | "right";
};

// Animation variants for reuse
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create your profile using your UCLA account and showcase your personality",
    position: "left",
  },
  {
    id: 2,
    title: "Swipe",
    description: "Discover fellow Bruins and swipe on profiles that catch your interest",
    position: "right",
  },
  {
    id: 3,
    title: "Match",
    description: "Connect with students who share mutual interest in getting to know you",
    position: "left",
  },
  {
    id: 4,
    title: "Chat",
    description: "Break the ice and start meaningful conversations with your matches",
    position: "right",
  },
  {
    id: 5,
    title: "Date",
    description: "Meet up on campus or around Westwood for an unforgettable experience",
    position: "left",
  },
];

export default function LoveJourney(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <Box component="section" className="py-20 relative overflow-hidden bg-[#0f172a] dark:bg-gray-900" id="journey">
      {/* Background decorative elements */}
      <div className="absolute -top-20 right-20 w-32 h-32 bg-uclaGold opacity-5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-uclaBlue opacity-5 rounded-full blur-xl"></div>
      
      <Container size="lg">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
          className="text-center mb-16"
        >
          <Badge 
            color="ucla" 
            size="lg" 
            className="mb-4"
            variant="light"
          >
            How It Works
          </Badge>
          <Title order={2} className="text-4xl font-bold text-gray-100 dark:text-white">
            Your Love Journey
          </Title>
          <Text className="mt-4 text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
            From sign-up to your first date, we&apos;re with you every step of the way
          </Text>
        </motion.div>

        <motion.div 
          ref={containerRef}
          className="relative max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Timeline center line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 -ml-0.5 w-0.5 h-full ucla-gradient-line rounded-full"></div>

          {/* Journey Steps */}
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`relative flex flex-col md:flex-row items-center mb-12 ${
                step.position === "left" 
                  ? "md:justify-start text-center md:text-right" 
                  : "md:justify-end text-center md:text-left"
              }`}
            >
              {/* Mobile version: full width card with left border accent */}
              <div className={`md:hidden w-full px-4 ${index !== journeySteps.length - 1 ? 'border-l border-[#5c8dc1] pb-6 ml-4' : ''}`}>
                <div className="bg-[#1e293b] dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-700 border-l-3 border-l-[#2774AE]">
                  <div className="flex items-center justify-start mb-3">
                    <Text className="text-sm font-semibold ucla-blue dark:text-[#78b0e2]">Step {step.id}</Text>
                    <div className="mx-2 h-[1px] w-4 bg-gray-600 dark:bg-gray-600"></div>
                    <Title order={4} className="text-lg font-bold text-gray-100 dark:text-white">
                      {step.title}
                    </Title>
                  </div>
                  <p className="text-gray-400 dark:text-gray-400 text-left text-sm">
                    {step.description}
                  </p>
                </div>
                {/* Mobile circle marker */}
                {index !== journeySteps.length - 1 && (
                  <div className="absolute left-4 top-full mt-2 w-2 h-2 rounded-full bg-ucla-blue border border-[#0f172a] dark:border-gray-900"></div>
                )}
              </div>

              {/* Desktop version: alternating left/right layout */}
              <div className={`hidden md:block ${
                step.position === "left" 
                  ? "pr-8 text-right" 
                  : "pl-8 text-left"
              } md:w-1/2`}>
                <motion.div 
                  className={`bg-[#1e293b] dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-700 transition-all duration-200 ${
                    step.position === "right" 
                      ? "border-l-2 border-l-[#2774AE]" 
                      : "border-r-2 border-r-[#2774AE]"
                  }`}
                  whileHover={{ y: -2, boxShadow: "0 10px 15px -5px rgba(0,0,0,0.03)" }}
                >
                  <div className={`flex items-center mb-3 ${step.position === "left" ? "justify-end" : "justify-start"}`}>
                    <Text className="text-sm font-semibold ucla-blue dark:text-[#78b0e2]">Step {step.id}</Text>
                    <div className="mx-2 h-[1px] w-4 bg-gray-600 dark:bg-gray-600"></div>
                    <Title order={4} className="text-lg font-bold text-gray-100 dark:text-white">
                      {step.title}
                    </Title>
                  </div>
                  <p className="text-gray-400 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </motion.div>
              </div>

              {/* Desktop circle marker - alternate colors for visual interest */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#0f172a] dark:border-gray-900 z-10"
                style={{
                  backgroundColor: index % 2 === 0 ? '#2774AE' : '#FFD100', // uclaBlue and uclaGold
                }}
              ></div>
              
              {/* Step line connector */}
              <div className="hidden md:block absolute w-10 h-0.5 top-1/2 -mt-px"
                style={{
                  left: step.position === 'left' ? 'calc(50% - 10px)' : 'auto',
                  right: step.position === 'right' ? 'calc(50% - 10px)' : 'auto',
                  background: index % 2 === 0 ? '#2774AE' : '#FFD100',
                }}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Box>
  );
} 