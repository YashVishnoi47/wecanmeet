"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
// import { useRouter } from "next/navigation";
import VisitGiub from "@/components/Github";
import { useSession } from "next-auth/react";
import Link from "next/link";

const HeroSection = () => {
  const { data: session } = useSession();
  // const router = useRouter();
  return (
    <div className="w-full flex justify-center items-start min-h-[89%] px-4">
      <div className="w-full max-w-7xl h-full flex justify-center items-center pt-8">
        <div className="w-full flex flex-col justify-center items-center text-center space-y-6">
          {/* Animated Logo or Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <VisitGiub />
          </motion.div>

          {/* Animated Heading */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold w-[90%] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Scheduling, the way it should be — simple, elegant, and free.
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            className="text-base md:text-lg w-full md:w-1/2 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-bold border-b border-white hover:border-black transition-all duration-200 ease-in-out cursor-default">
              wecanmeet
            </span>{" "}
            makes booking meetings simple — no fees, no friction, just clean
            scheduling.
          </motion.p>

          {/* Call to Action Button */}
          {session ? (
            <Link
              className="mt-4 px-6 py-3 bg-black text-white text-base md:text-lg font-semibold rounded-full hover:bg-gray-800 transition-all duration-300"
              href={"/dashboard"}
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              className="mt-4 px-6 py-3 bg-black text-white text-base md:text-lg font-semibold rounded-full hover:bg-gray-800 transition-all duration-300"
              href={"/sign-up"}
            >
              Get Started for Free
            </Link>
          )}

          {/* Target Audience Pills */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center items-center gap-4 text-gray-700 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="px-4 py-2 rounded-full border bg-white shadow-sm font-medium">
              Students
            </span>
            <span className="px-4 py-2 rounded-full border bg-white shadow-sm font-medium">
              Freelancers
            </span>
            <span className="px-4 py-2 rounded-full border bg-white shadow-sm font-medium">
              Remote Teams
            </span>
            <span className="px-4 py-2 rounded-full border bg-white shadow-sm font-medium">
              Founders
            </span>
            <span className="px-4 py-2 rounded-full border bg-white shadow-sm font-medium">
              Content Creators
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
