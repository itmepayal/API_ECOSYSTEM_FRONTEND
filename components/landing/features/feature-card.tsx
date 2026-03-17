import { memo } from "react";
import { motion } from "framer-motion";
import type { FeatureCardProps } from "@/types";
import {
  featureCardHover,
  featureIconHover,
  featureCard as featureCardVariant,
} from "@/animations";

export const FeatureCard = memo(
  ({ icon: Icon, title, description }: FeatureCardProps) => {
    return (
      <motion.div
        variants={featureCardVariant}
        whileHover={featureCardHover}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-linear-to-b from-[#1E1E1E] to-[#050505] p-6 space-y-4"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/5 blur-2xl"></div>

        <motion.div
          whileHover={featureIconHover}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative z-10 w-fit p-3 rounded-lg bg-zinc-900 border border-zinc-700"
        >
          <Icon size={22} className="text-white" />
        </motion.div>

        <p className="relative z-10 font-semibold text-lg text-white">
          {title}
        </p>

        <p className="relative z-10 text-sm text-gray-400 leading-relaxed">
          {description}
        </p>
      </motion.div>
    );
  }
);
