import React from "react";
import { motion } from "framer-motion";

const Topbar = ({ Heading, text, handleSave }) => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.1,
        duration: 0.5,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 18,
      }}
      className="w-full border-b border-neutral-800 bg-black/30 backdrop-blur-md px-6 py-4 flex items-center justify-between rounded-t-xl shadow-sm"
    >
      {/* Left Section (Title & Subtitle) */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold text-white">{Heading}</h1>
        <p className="text-sm text-neutral-400 mt-1">
         {text}
        </p>
      </div>

      {/* Right Section (Button) */}
      <div className="flex items-center justify-end">
        {handleSave && (
          <motion.button
            onClick={handleSave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
            className="px-5 py-2 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black hover:border-black backdrop-blur-md font-medium text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Save
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default Topbar;
