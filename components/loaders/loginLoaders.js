"use client";
import { motion } from "framer-motion";

export default function LoginLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinning Loader Animation */}
        <motion.div
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        {/* Loading Text Animation */}
        <motion.p
          className="text-lg font-semibold tracking-wider"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Logging you in...
        </motion.p>
      </motion.div>
    </div>
  );
}
