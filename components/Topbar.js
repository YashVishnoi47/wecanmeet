import React from "react";
import { motion } from "framer-motion";

const Topbar = ({ Heading, text, handleSave }) => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }} // slide in from top on mount
      animate={{ y: 0, opacity: 1 }} // final position
      transition={{
        delay: 0.3, // small delay before showing
        duration: 0.5, // animation duration
        ease: "easeOut", // easing for smoother animation
        type: "spring", // spring-like bounce
        stiffness: 100, // how stiff the spring is
        damping: 18, // how much bounce to reduce
      }}
      className="w-full px-6 py-4 flex items-center justify-between rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-mdbackdrop-blur-md shadow-md"
    >
      {/* Left: Heading and text */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-white">{Heading}</h1>
        <p className="text-sm text-white/60 mt-1">{text}</p>
      </div>

      {/* Right: Save Button */}
      {handleSave && (
        <motion.button
          onClick={handleSave}
          initial={{ opacity: 0 }} // fade in
          animate={{ opacity: 1 }} // full visibility
          transition={{ delay: 0.3, ease: "easeInOut" }} // delayed entrance
          className="px-5 py-2 rounded-lg  border border-white/20 bg-white/10 text-white font-medium text-sm transition-all duration-200 hover:bg-white hover:text-black hover:border-black active:scale-95 cursor-pointer backdrop-blur-md"
        >
          Save
        </motion.button>
      )}
    </motion.div>
  );
};

export default Topbar;
