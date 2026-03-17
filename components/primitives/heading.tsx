import { memo } from "react";
import { motion } from "framer-motion";
import type { HeadingProps } from "@/types";
import { headingContainer, headingBadge, headingTitle } from "@/animations";

export const Heading = memo(({ label, title }: HeadingProps) => {
  return (
    <motion.header
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4"
    >
      {title && (
        <motion.span
          variants={headingBadge}
          className="flex items-center justify-center px-6 h-8 bg-linear-to-b from-[#1E1E1E] to-[#050505] border border-[#242424] text-slate-200 text-xs rounded-lg"
        >
          {title}
        </motion.span>
      )}

      <motion.h2
        variants={headingTitle}
        className="text-2xl md:text-[30px] lg:text-[35px] text-center max-w-4xl 
        bg-linear-to-r from-white via-gray-300 to-[#313131] text-transparent bg-clip-text 
        leading-tight px-4"
      >
        {label}
      </motion.h2>
    </motion.header>
  );
});
