import type { Variants } from "framer-motion";

export const featureContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const featureCard: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

export const featureCardHover = {
  y: -8,
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
};

export const featureIconHover = {
  rotate: 5,
  scale: 1.1,
};
