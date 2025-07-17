"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "100% Free",
    desc: "Unlike others, all features are truly free—no paywalls, ever.",
  },
  {
    title: "Secure & Private",
    desc: "Your data and meetings are protected with strong privacy practices.",
  },
  {
    title: "Works Across Time Zones",
    desc: "Auto-detects and adjusts for different time zones to avoid confusion.",
  },
  {
    title: "Easy to Use",
    desc: "Clean interface designed for everyone—from beginners to pros.",
  },
  {
    title: "Instant Confirmation",
    desc: "Both sides get instant email confirmations after booking.",
  },
  {
    title: "Custom Availability",
    desc: "Set different slots for different days with complete flexibility.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50, damping: 20 },
  },
};

const Section4 = () => {
  const router = useRouter();
  return (
    <motion.div
      className="w-full px-4 py-16 flex flex-col items-center justify-center text-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Headings */}
      <motion.h2
        variants={fadeInUp}
        className="text-3xl sm:text-4xl font-bold text-black mb-2"
      >
        Ready to get started?
      </motion.h2>
      <motion.p variants={fadeInUp} className="text-lg text-gray-500 mb-10">
        Schedule your meeting in better way.
      </motion.p>

      {/* Feature Grid */}
      <motion.div
        className="flex flex-wrap justify-center gap-x-8 gap-y-10 w-full max-w-6xl"
        variants={fadeInUp}
      >
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            className="flex flex-col items-center text-center flex-[1_1_250px] max-w-[300px]"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-xl mb-4">
              ✓
            </div>
            <h3 className="font-semibold text-black text-lg mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Button */}
      <motion.button
        onClick={() => {
          router.push("/sign-up");
        }}
        variants={fadeInUp}
        className="mt-10 bg-black/10 text-black font-medium px-6 py-2 rounded-full hover:bg-black/20 transition cursor-pointer"
      >
        Start now
      </motion.button>
    </motion.div>
  );
};

export default Section4;
