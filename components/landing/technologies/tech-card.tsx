import { memo } from "react";
import { motion } from "framer-motion";
import { technologiesCard, technologiesIcon } from "@/animations";
import type { TechCardProps } from "@/types";

export const TechCard = memo(({ name, Icon }: TechCardProps) => (
  <motion.div
    variants={technologiesCard}
    whileHover={{ y: -5, scale: 1.05 }}
    className="bg-linear-to-b from-[#1E1E1E] to-[#050505] border border-[#242424] rounded-lg p-6 flex flex-col items-center gap-3 relative overflow-hidden"
  >
    <motion.div
      variants={technologiesIcon}
      className="flex items-center justify-center"
    >
      <Icon size={30} stroke={2} className="text-white" aria-hidden="true" />
    </motion.div>

    <h3 className="text-sm text-gray-300 text-center">{name}</h3>

    {/* Hover Glow */}
    <motion.div
      className="absolute inset-0 bg-white/5 opacity-0 rounded-lg"
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>
));
