"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CommonButton from "@/components/CommonButton";

const dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();

  //  Creating Meeting Card
  const CreateMeetingCard = async () => {
    try {
      const res = await fetch(`/api/meeting/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardOwnerId: session?.user._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
      } else {
        console.log("Card Created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Access Denied
        </motion.h1>

        <motion.p
          className="mt-4 text-sm md:text-base text-gray-300 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          You are not authorized to view this page. Please log in to continue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <Button
            className="bg-white text-black hover:bg-black hover:text-white  hover:border-white active:scale-95 border  border-black transition-all duration-300 ease-in-out px-6 py-2 rounded-xl shadow-lg cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <motion.button
        onClick={CreateMeetingCard}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0, ease: "easeIn" }}
        className={
          "px-5 py-2  rounded-lg border-2 bg-black hover:bg-white hover:border-black active:scale-95 hover:text-black backdrop-blur-lg text-white transition-all duration-200 ease-in-out cursor-pointer"
        }
      >
        Create Card
      </motion.button>
    </div>
  );
};

export default dashboard;
