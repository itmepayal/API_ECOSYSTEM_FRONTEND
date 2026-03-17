"use client";

import { motion } from "framer-motion";
import { VerticalGridLines } from "@/components/shared/vertical-grid-lines";
import { SectionDivider } from "@/components/primitives/section-divider";
import { Heading } from "@/components/primitives/heading";
import { Container } from "@/components/primitives/container";
import { ECOSYSTEM_INFO } from "@/constants";
import { EcosystemCard } from "@/components/landing/ecosystem/ecosystem-card";
import { ecosystemContainer } from "@/animations";

const Ecosystem = () => {
  return (
    <Container id="ecosystem">
      <VerticalGridLines className="top-0" />
      <SectionDivider />

      <motion.section
        variants={ecosystemContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 flex flex-col items-center gap-6"
        aria-labelledby="ecosystem-heading"
      >
        <Heading
          title="API Ecosystem"
          label="A Powerful Ecosystem of Scalable APIs"
        />

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl px-5 md:px-10">
          {ECOSYSTEM_INFO.map((item) => (
            <EcosystemCard key={item.id} item={item} />
          ))}
        </div>
      </motion.section>

      <SectionDivider />
    </Container>
  );
};

export default Ecosystem;
