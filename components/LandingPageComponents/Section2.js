"use client";
import React from "react";
import { motion } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa6";
import SpotlightCard from "../AnimatedComponents/SpotlightCard";
import { SiGmail } from "react-icons/si";
import Image from "next/image";
import { useRouter } from "next/navigation";

const featureCard = [
  {
    heading: "Smart Email Updates",
    discription:
      "You and your guests get instant email updates — keeping everyone in sync.",
    Image: "/Gmail.svg",
  },
  {
    heading: "Your Own Meeting Card",
    discription:
      "Create a personalized digital Meeting Card to share your availability in one sleek.",
    Image: "/card.svg",
  },
  {
    heading: "You Control the Clock",
    discription:
      "Set your available hours, buffer times, and breaks — wecanmeet adapts to your schedule, not the other way around.",
    Image: "/schedule.svg",
  },
];

const Section2 = () => {
  const router = useRouter();

  return (
    <motion.div className="w-full h-[100%] border-t flex flex-col gap-3 sm:gap-4 py-4 sm:py-6 justify-center items-center border-gray-300">
      {/* Batch */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-[11px] font-medium text-gray-700 shadow-sm"
      >
        {/* calendar icon */}
        <SlCalender className="text-xs sm:text-sm text-gray-500" />
        {/* tag label */}
        HOW IT WORKS
      </motion.div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center px-4"
      >
        We built wecanmeet to give you full freedom
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-sm sm:text-md text-neutral-700 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[34%] text-center px-4"
      >
        No paywalls. No limits. Just seamless, secure scheduling—designed to
        give you complete control, without compromise.
      </motion.p>

      <motion.button
        onClick={() => {
          router.push("/sign-up");
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center items-center gap-2 hover:gap-3 bg-black text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium hover:bg-neutral-900 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        Get Started
        <FaArrowRight />
      </motion.button>

      <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] h-auto lg:h-[85%] mt-4 sm:mt-6 flex flex-col md:flex-row gap-3 sm:gap-4 justify-center border-black">
        {featureCard.map((item, idx) => (
          <SpotlightCard
            key={idx}
            className="w-full md:w-[35%] h-auto md:h-[60%] p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/10 duration-200 ease-in-out shadow-md"
            spotlightColor="rgba(0, 172, 255, 0.1)"
          >
            {/* Top Row: Icon + Heading + Badge */}
            <div className="flex items-center justify-between mb-2">
              {/* Icon + Heading */}
              <div className="flex items-center gap-2 sm:gap-3">
                <Image
                  src={item.Image}
                  height={32}
                  width={32}
                  alt="Logo"
                  className="sm:w-10 sm:h-10"
                />
                <h1 className="text-lg sm:text-xl font-semibold text-black tracking-tight">
                  {item.heading}
                </h1>
              </div>

              {/* Badge */}
              <span className="text-[9px] sm:text-[10px] text-blue-600 bg-blue-100 px-1.5 sm:px-2 py-[1px] sm:py-[2px] rounded-full whitespace-nowrap">
                #{idx + 1}
              </span>
            </div>

            {/* Feature Description */}
            <p className="text-xs sm:text-sm text-black/80 leading-relaxed">
              {item.discription}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </motion.div>
  );
};

export default Section2;
