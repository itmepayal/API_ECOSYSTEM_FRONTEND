import type { Variants } from "framer-motion";

export const ecosystemContainer: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

export const ecosystemCard: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
    rotateX: 10,
    rotateY: -5,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 20,
      mass: 0.8,
    },
  },
};

export const ecosystemIcon: Variants = {
  hidden: { opacity: 0, rotate: -30, scale: 0.7 },
  show: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

export const ecosystemButton: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 18,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};
