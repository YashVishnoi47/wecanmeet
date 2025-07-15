"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DummyMeetingCard from "./DummyMeetingcard";
import StartButton from "../StartButton";

const HeroSection = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex flex-col justify-center mt-20 border-black items-center h-[30%]">
      <div className="w-full h-full flex flex-col justify-center  border-black items-center">
        <div className="w-full h-full px-6 py-8 flex flex-col justify-center items-center text-center space-y-6">
          {/* Heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold w-[90%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            Scheduling, the way it should be - simple, elegant, and free
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-base md:text-lg text-center md:w-[90%] font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <span className="font-bold border-b border-white hover:border-black transition-all duration-200 ease-in-out cursor-default">
              wecanmeet
            </span>{" "}
            makes booking meetings simple — no fees, no friction, just clean
            scheduling.
          </motion.p>

          {/* Call to Action Button */}
          <div className="w-[90%] flex justify-center items-center">
            <StartButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
