"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { SectionDivider } from "@/components/primitives/section-divider";
import { footerText } from "@/animations";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex justify-between px-4 md:px-16 lg:px-24 xl:px-32">
        <div className="w-px bg-zinc-800"></div>
        <div className="w-px bg-zinc-800"></div>
      </div>

      <SectionDivider />

      <motion.p
        variants={footerText}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-8 px-5 text-sm text-zinc-400 text-center"
      >
        © {new Date().getFullYear()} FreeAPI Hub. Designed & Developed by{" "}
        <a href="#" className="text-white hover:underline">
          Payal Yadav
        </a>
      </motion.p>
    </footer>
  );
};

export default memo(Footer);
