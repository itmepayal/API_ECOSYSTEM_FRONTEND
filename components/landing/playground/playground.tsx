"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/primitives/container";
import { Heading } from "@/components/primitives/heading";
import { SectionDivider } from "@/components/primitives/section-divider";
import { VerticalGridLines } from "@/components/shared/vertical-grid-lines";
import { PlaygroundFooter } from "@/components/landing/playground/playground-footer";
import { PlaygroundTabs } from "@/components/landing/playground/playground-tabs";
import { PlaygroundEditor } from "@/components/landing/playground/playground-editor";

import { TABS, CODESNIPPETS, type TAB } from "@/constants";
import { playgroundContainer, playgroundItem } from "@/animations";

const Playground = () => {
  const [activeTab, setActiveTab] = useState<TAB>(TABS[0]);

  return (
    <Container id="playground">
      <VerticalGridLines className="top-0" />
      <SectionDivider />
      <motion.div
        variants={playgroundContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 md:px-10 flex flex-col items-center gap-6 w-full"
      >
        <motion.div variants={playgroundItem}>
          <Heading
            title="Launch API Playground"
            label="Power Your APIs with the Best Tools"
          />
        </motion.div>

        <motion.div
          variants={playgroundItem}
          className="px-5 w-full flex items-center justify-center"
        >
          <div className="border border-[#242424] w-full max-w-3xl rounded-lg overflow-hidden">
            <PlaygroundTabs
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <PlaygroundEditor
              activeTab={activeTab}
              code={CODESNIPPETS[activeTab]}
            />
          </div>
        </motion.div>

        <motion.div variants={playgroundItem}>
          <PlaygroundFooter />
        </motion.div>
      </motion.div>

      <SectionDivider />
    </Container>
  );
};

export default Playground;
