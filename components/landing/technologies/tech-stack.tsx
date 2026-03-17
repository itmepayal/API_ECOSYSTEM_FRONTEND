"use client";

import { motion } from "framer-motion";
import { VerticalGridLines } from "@/components/shared/vertical-grid-lines";
import { SectionDivider } from "@/components/primitives/section-divider";
import { Heading } from "@/components/primitives/heading";
import { Container } from "@/components/primitives/container";
import { TechCard } from "@/components/landing/technologies/tech-card";
import { TECHSTACK_INFO } from "@/constants";
import { technologiesContainer } from "@/animations/technologies";

const TechStack = () => {
  return (
    <Container
      id="tech"
      className="relative flex flex-col items-center bg-black text-white overflow-hidden"
    >
      <VerticalGridLines className="top-0" />
      <SectionDivider />
      <div className="py-20 px-4 flex flex-col items-center gap-6 w-full">
        <Heading
          title="Tech Stack"
          label="Tools & Technologies Powering the API Ecosystem"
        />

        <motion.div
          variants={technologiesContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 md:px-10 pt-10"
        >
          {TECHSTACK_INFO.map((tech) => (
            <TechCard key={tech.name} name={tech.name} Icon={tech.icon} />
          ))}
        </motion.div>
      </div>
      <SectionDivider />
    </Container>
  );
};

export default TechStack;
