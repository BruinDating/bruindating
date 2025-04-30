"use client";

import { Button, Container, Group, Box, Title, Badge, Text } from "@mantine/core";
import { useAuth } from "@/components/Auth/AuthContext";
import { useEffect } from "react";
import { motion, Variants } from "framer-motion";
import LoveJourney from "@/components/LoveJourney/LoveJourney";
import React from "react";
import AnimatedRoyce from "@/components/AnimatedRoyce/AnimatedRoyce";

// Animation variants
const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
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
  }
};

const pulseVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: "0 10px 25px -5px rgba(39, 116, 174, 0.2)",
    transition: { 
      scale: { duration: 0.2, ease: "easeOut" },
      boxShadow: { duration: 0.2, ease: "easeOut" }
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      scale: { duration: 0.1, ease: "easeOut" }
    }
  }
};

interface BackgroundProps {
  gradient: string;
}

const LandingPage = (): React.ReactElement => {
  const { login, isLoading, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User authenticated, AuthContext will handle routing");
    }
  }, [isAuthenticated, user]);

  const handleSignIn = async (): Promise<void> => {
    await login();
  };

  const backgroundStyle: BackgroundProps = {
    gradient: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)"
  };

  return (
    <>
      {/* Hero Section */}
      <Box 
        component="section" 
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{
          background: backgroundStyle.gradient,
        }}
      >
        {/* Royce Hall drawing as full-screen background */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatedRoyce />
        </div>
        
        {/* Content wrapper with proper z-index */}
        <div className="relative z-10 w-full">
          {/* Decorative elements */}
          <div className="bg-blur-circle top-20 right-20 w-64 h-64" />
          <div className="bg-gold-circle bottom-20 left-20 w-64 h-64" />
          <div className="absolute top-20 left-1/4 w-3 h-3 bg-[#FFD100] opacity-30 rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#2774AE] opacity-20 rounded-full" />
          <div className="absolute bottom-20 left-1/3 w-4 h-4 bg-[#2774AE] opacity-20 rounded-full" />
          
          <Container size="lg">
            <motion.div
              className="py-16 md:py-24"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="text-center max-w-3xl mx-auto mb-10"
              >
                <motion.div variants={itemVariants}>
                  <Badge 
                    color="ucla" 
                    size="xl" 
                    className="mb-4 mx-auto"
                    variant="filled"
                  >
                    Exclusively for UCLA Students
                  </Badge>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Title className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
                    BRUIN DATING
                  </Title>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Text className="text-xl md:text-2xl text-gray-300 mb-10 max-w-xl mx-auto">
                    Find your perfect match within the UCLA community
                  </Text>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-8">
                  <Group justify="center">
                    <motion.div 
                      variants={pulseVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <Button
                        variant="filled"
                        color="ucla"
                        size="xl"
                        radius="xl"
                        onClick={handleSignIn}
                        loading={isLoading}
                        className="hover:opacity-90 transition-all shadow-md"
                        style={{ padding: "0 2rem" }}
                      >
                        Sign In with UCLA Account
                      </Button>
                    </motion.div>
                  </Group>
                </motion.div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="mt-16 md:mt-24 text-center"
              >
                <Text className="text-gray-400">
                  Join hundreds of UCLA students already finding meaningful connections
                </Text>
              </motion.div>
            </motion.div>
          </Container>
        </div>
      </Box>

      {/* Love Journey Section */}
      <LoveJourney />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-gray-800 py-8">
        <Container size="lg">
          <div className="text-center">
            <Text size="sm" className="text-gray-400">
              © {new Date().getFullYear()} Bruin Dating. Exclusively for UCLA students.
            </Text>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default LandingPage;