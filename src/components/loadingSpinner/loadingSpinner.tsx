"use client";
import { motion } from "framer-motion";

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="w-28 h-28 border-8 border-gray-200 border-l-blue-500 rounded-full"
        variants={spinnerVariants}
        animate="animate"
      />
    </div>
  );
}
