"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";
import RotatingText from "../AnimatedComponents/RotatingText";
import { useRouter } from "next/navigation";

const Section3 = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center items-center h-full border-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] h-auto lg:h-[85%] flex flex-col lg:flex-row border border-gray-300 shadow-lg border-dotted rounded-2xl sm:rounded-3xl lg:rounded-4xl bg-white/5 backdrop-blur-md overflow-hidden"
      >
        <div className="h-auto lg:h-full w-full lg:w-[40%] flex justify-center items-center p-4 sm:p-6 lg:p-8">
          <Image
            src={"/calender illus.svg"}
            width={250}
            height={250}
            alt="Image"
            className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px]"
          />
        </div>

        <div className="h-auto lg:h-full w-full lg:w-[60%] flex flex-col gap-2 sm:gap-3 justify-start items-start py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex flex-wrap justify-start items-center gap-2">
            <span className="text-[#864C91]">Smart Scheduling</span>{" "}
            <span className="transition-all duration-300 ease-in">
              Starts Here
            </span>
          </h1>

          <p className="text-sm sm:text-md text-neutral-500 leading-relaxed">
            Say goodbye to messy calendars and missed meetings — plan, organize,
            and stay ahead effortlessly with wecanmeet.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-2">
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-white/80 border border-gray-300 rounded-full text-xs sm:text-sm text-black backdrop-blur-sm">
              🔒 Secure Meetings
            </div>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-white/80 border border-gray-300 rounded-full text-xs sm:text-sm text-black backdrop-blur-sm">
              ⚡ One-Click Scheduling
            </div>
            <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 bg-white/80 border border-gray-300 rounded-full text-xs sm:text-sm text-black backdrop-blur-sm">
              📅 Personalized Meeting Card
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-6 mt-3 sm:mt-4">
            <motion.button
              onClick={() => {
                router.push("/sign-up");
              }}
              className="flex justify-center items-center gap-2 bg-black text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium cursor-pointer active:scale-95 hover:bg-neutral-800 transition-all duration-400 ease-in-out"
            >
              Schedule Now
              <FaArrowRight />
            </motion.button>

            <p className="text-xs sm:text-sm text-neutral-500 underline underline-offset-2 cursor-default">
              {`It's Free`}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Section3;
