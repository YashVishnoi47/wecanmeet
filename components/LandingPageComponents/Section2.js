"use client";
import React from "react";
import { motion } from "framer-motion";
import { SlCalender } from "react-icons/sl";
import { FaArrowRight } from "react-icons/fa6";
import SpotlightCard from "../AnimatedComponents/SpotlightCard";
import { SiGmail } from "react-icons/si";
import Image from "next/image";

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
  return (
    <motion.div className="w-full h-[100%] border flex flex-col gap-4 py-4 justify-center items-center border-gray-300">
      {/* Batch */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-100 px-3 py-2 text-[11px] font-medium text-gray-700 shadow-sm"
      >
        {/* calendar icon */}
        <SlCalender className="text-sm text-gray-500" />
        {/* tag label */}
        HOW IT WORKS
      </motion.div>
      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl font-bold"
      >
        We built wecanmeet to give you full freedom
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-md text-neutral-700 w-[34%] text-center"
      >
        No paywalls. No limits. Just seamless, secure scheduling—designed to
        give you complete control, without compromise.
      </motion.p>
      <button className="flex justify-center items-center gap-2 hover:gap-3 bg-black text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-neutral-900 active:scale-95 transition-all duration-200 cursor-pointer">
        Get Started
        <FaArrowRight />
      </button>

      <div className="w-[80%] h-[65%] mt-10 flex gap-4 justify-center border-black">
        {featureCard.map((item, idx) => (
          <SpotlightCard
            key={idx}
            className="w-[35%] h-[40%] p-6 rounded-2xl bg-white/10 duration-200 ease-in-out shadow-md"
            spotlightColor="rgba(0, 172, 255, 0.1)"
          >
            {/* Top Row: Icon + Heading + Badge */}
            <div className="flex items-center justify-between mb-2">
              {/* Icon + Heading */}
              <div className="flex items-center gap-3">
                <Image
                  src={item.Image}
                  height={40}
                  width={40}
                  alt="Logo"
                  className=""
                />
                <h1 className="text-xl font-semibold text-black tracking-tight">
                  {item.heading}
                </h1>
              </div>

              {/* Badge */}
              <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-[2px] rounded-full whitespace-nowrap">
                #{idx + 1}
              </span>
            </div>

            {/* Feature Description */}
            <p className="text-sm text-black/80 leading-relaxed">
              {item.discription}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </motion.div>
  );
};

export default Section2;
