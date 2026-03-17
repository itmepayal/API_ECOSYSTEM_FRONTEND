"use client";

import { memo } from "react";
import { motion, useScroll } from "framer-motion";

export const ScrollProgressBar = memo(() => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        height: "5px",
        background: "#ffffff",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
      }}
    />
  );
});
