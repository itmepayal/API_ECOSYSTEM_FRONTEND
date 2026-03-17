"use client";

import { motion } from "framer-motion";
import { IconBrandGithub, IconFileText } from "@tabler/icons-react";

import { Navbar } from "@/components/landing/navbar/navbar";
import { IconButton } from "@/components/primitives/icon-button";
import { StatusBadge } from "@/components/landing/hero/status-badge";
import { HeroTitle } from "@/components/landing/hero/hero-title";
import { Description } from "@/components/primitives/description";
import { SectionDivider } from "@/components/primitives/section-divider";
import { VerticalGridLines } from "@/components/shared/vertical-grid-lines";
import {
  heroContainer,
  heroBadge,
  heroTitle,
  heroDescription,
  heroButton,
} from "@/animations";

const Hero = () => {
  return (
    <header className="flex flex-col items-center bg-black text-white relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* Background grid */}
      <VerticalGridLines className="top-20" />

      {/* Animated Content */}
      <motion.div
        variants={heroContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        {/* Status Badge */}
        <motion.div variants={heroBadge}>
          <StatusBadge label="Hands-On APIs" />
        </motion.div>

        {/* Hero Title */}
        <motion.div variants={heroTitle}>
          <HeroTitle label="Build Hands-On Projects with Free APIs" />
        </motion.div>

        {/* Description */}
        <motion.div variants={heroDescription}>
          <Description>
            An open-source API hub with 50+ endpoints — including
            authentication, e-commerce, social media, and chat. Build real-world
            projects and master API integration, completely free.
          </Description>
        </motion.div>

        {/* Buttons */}
        <motion.div variants={heroButton} className="flex gap-3 mt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              to="https://freeapihub.up.railway.app/"
              label="Swagger Docs"
              ariaLabel="Open Swagger API documentation"
              icon={<IconFileText size={18} stroke={2} />}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              to="https://github.com/itmepayal/"
              label="GitHub"
              ariaLabel="View project source code on GitHub"
              icon={<IconBrandGithub size={18} stroke={2} />}
            />
          </motion.div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          variants={heroDescription}
          className="flex items-center gap-2.5 px-6 mt-9"
        >
          <Description>
            Driving Innovation in 2026 with API-Based Solutions by FreeAPI Hub.
          </Description>
        </motion.div>
      </motion.div>

      {/* Section Divider */}
      <SectionDivider className="mt-32" />
    </header>
  );
};

export default Hero;
