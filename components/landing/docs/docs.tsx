"use client";

import { motion } from "framer-motion";
import { IconExternalLink } from "@tabler/icons-react";

import { VerticalGridLines } from "@/components/shared/vertical-grid-lines";
import { SectionDivider } from "@/components/primitives/section-divider";
import { Heading } from "@/components/primitives/heading";
import { Container } from "@/components/primitives/container";
import { IconButton } from "@/components/primitives/icon-button";
import { docsContainer, docsItem } from "@/animations";

const Documents = () => {
  return (
    <Container id="docs">
      <VerticalGridLines className="top-0" />

      <SectionDivider />

      <motion.div
        variants={docsContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center mx-auto max-md:mx-2 max-md:px-2 max-w-5xl w-full text-center py-16"
      >
        <motion.div variants={docsItem}>
          <Heading label="Interactive API Documentation with Swagger" />
        </motion.div>

        <motion.div variants={docsItem} className="flex gap-5 pt-10">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              to="https://freeapihub.up.railway.app/"
              label="REST API Docs"
              ariaLabel="Open REST API Documentation"
              icon={
                <IconExternalLink size={18} stroke={2} aria-hidden="true" />
              }
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              to="https://freeapihub.up.railway.app/"
              label="FastAPI Docs"
              ariaLabel="Open FastAPI Documentation"
              icon={
                <IconExternalLink size={18} stroke={2} aria-hidden="true" />
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <SectionDivider />
    </Container>
  );
};

export default Documents;
