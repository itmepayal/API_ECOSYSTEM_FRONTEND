"use client";

import { motion } from "framer-motion";

import { VerticalGridLines } from "@/components/shared/vertical-grid-lines";
import { SectionDivider } from "@/components/primitives/section-divider";
import { Heading } from "@/components/primitives/heading";
import { Container } from "@/components/primitives/container";
import { FEATURES_INFO } from "@/constants";
import { featureContainer } from "@/animations";
import { FeatureCard } from "@/components/landing/features/feature-card";

const Feature = () => {
  return (
    <Container id="features">
      <VerticalGridLines className="top-0" />
      <SectionDivider />

      <div className="py-20 px-4 flex flex-col justify-center items-center gap-6">
        <Heading
          title="Features"
          label="Build Faster with Production-Ready APIs"
        />

        <motion.div
          variants={featureContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-5 md:px-11"
        >
          {FEATURES_INFO.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>

      <SectionDivider />
    </Container>
  );
};

export default Feature;
