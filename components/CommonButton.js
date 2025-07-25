"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CommonButton = ({ text, link }) => {
  const router = useRouter();
  return (
    <motion.button
      onClick={() => link && router.push(link)}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ delay: 1.6, ease: "easeIn" }}
      className={
        "px-5 py-2  rounded-lg border-2 bg-white/10 hover:bg-black hover:border-black active:scale-95 hover:text-white backdrop-blur-lg text-black transition-all duration-200 ease-in-out cursor-pointer"
      }
    >
      {text}
    </motion.button>
  );
};

export default CommonButton;
