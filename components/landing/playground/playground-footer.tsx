import { memo } from "react";
import { motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";

export const PlaygroundFooter = () => {
  return (
    <motion.a
      whileHover={{ x: 6 }}
      whileTap={{ scale: 0.95 }}
      href="https://freeapihub.up.railway.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-white/60 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
    >
      <span className="text-sm md:text-base font-medium">
        Explore the full API documentation
      </span>

      <IconArrowUpRight aria-hidden="true" />
    </motion.a>
  );
};
