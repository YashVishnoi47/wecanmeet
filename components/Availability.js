"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const Availability = () => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full text-white flex flex-col justify-start items-center">
      {/* Header */}
      <motion.div
        initial={{y:-75,}}
        animate={{y:0}}
        transition={{ delay: 0.2, type:"spring" }}
        className="w-[99%] h-[10%] border-b  flex items-center p-2"
      >
        {/* Left */}
        <div className="flex flex-col h-full w-1/2">
          <h1 className="text-2xl font-bold">Working Hours</h1>
          <p className="text-neutral-500 text-sm">
            Configure your available working hours for bookings.
          </p>
        </div>
        {/* Right */}
        <div className="flex flex-col h-full w-1/2 items-end justify-center">
          {session?.user.MeetingCardID.length < 1 && (
            <motion.button
              //   onClick={CreateMeetingCard}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0, ease: "easeIn" }}
              className={
                "px-5 py-2 w-[25%] rounded-lg border-2 bg-black hover:bg-white hover:border-black active:scale-95 hover:text-black backdrop-blur-lg text-white transition-all duration-200 ease-in-out cursor-pointer"
              }
            >
              Create Card
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="w-full h-[90%] flex items-center p-2"></div>
    </div>
  );
};

export default Availability;
