import { motion } from "framer-motion";
import { IconPlayerPlay } from "@tabler/icons-react";
import { IconButton } from "@/components/primitives/icon-button";
import type { EcosystemCardProps } from "@/types";
import {
  ecosystemCard as EcoSystemCardVariant,
  ecosystemIcon,
  ecosystemButton,
} from "@/animations";

export const EcosystemCard = ({ item }: EcosystemCardProps) => {
  const Icon = item.icon;

  return (
    <motion.article
      variants={EcoSystemCardVariant}
      initial="hidden"
      animate="show"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="group bg-linear-to-b from-[#1E1E1E] to-[#050505] border border-[#242424] rounded-lg p-6 hover:border-white transition-all duration-300 relative overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Icon */}
      <motion.div
        variants={ecosystemIcon}
        className="mb-3 bg-linear-to-b from-[#1E1E1E] to-[#050505] border border-[#242424] h-12 w-12 rounded-lg flex items-center justify-center"
      >
        <Icon size={24} stroke={2} className="text-white" />
      </motion.div>

      <h3 className="text-xl text-white mb-3">{item.title}</h3>

      <p className="text-sm text-white/60 mb-5 line-clamp-2">
        {item.description}
      </p>

      {/* Buttons */}
      <motion.div
        variants={ecosystemButton}
        whileHover="hover"
        whileTap={{ scale: 0.95 }}
        className="flex gap-2"
      >
        <IconButton
          to={item.link}
          label="REST API"
          icon={<IconPlayerPlay size={18} stroke={2} />}
          ariaLabel={`View REST API for ${item.title}`}
        />

        <IconButton
          to={item.link}
          label="FAST API"
          icon={<IconPlayerPlay size={18} stroke={2} />}
          ariaLabel={`View FastAPI for ${item.title}`}
        />
      </motion.div>
    </motion.article>
  );
};
