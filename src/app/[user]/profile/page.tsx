"use client";

import React, { useState } from "react";
import { Transition, MantineTransition, Grid, Container, Center } from "@mantine/core";
import { motion } from "motion/react";
import ProfileSidebar from "@/components/Profile/ProfileSidebar";
import AboutSection from "@/components/Profile/AboutSection";
import MediaSection from "@/components/Profile/MediaSection";
import PersonalInfo from "@/components/Profile/PersonalInfo";
import FamilyInfo from "@/components/Profile/FamilyInfo";

const ProfilePage = () => {
  const [opened, setOpened] = useState(true);
  const [transition, setTransition] = useState<MantineTransition>("pop-top-right");

  return (
    <motion.div animate={{ scale: 1 }}>
      <Transition mounted={opened} transition={transition} duration={400}>
        {(styles) => (
          <Center style={styles}>
            <Container size="xl" className="min-h-screen py-6">
              <Grid gutter="xl">
                {/* LEFT COLUMN: Profile + About (1/3 width) */}
                <Grid.Col span={{ md: 4 }}>
                  <ProfileSidebar />
                  <AboutSection />
                </Grid.Col>

                {/* RIGHT COLUMN: Media + Personal Info + Family (2/3 width) */}
                <Grid.Col span={{ md: 8 }}>
                  <MediaSection />
                  <PersonalInfo />
                  <FamilyInfo />
                </Grid.Col>
              </Grid>
            </Container>
          </Center>
        )}
      </Transition>
    </motion.div>
  );
};

export default ProfilePage;
