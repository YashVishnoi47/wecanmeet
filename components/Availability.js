"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import UpdateScheduleForm from "./UpdateScheduleForm";

const cardVariants = {
  hidden: { opacity: 0, y: 40 }, // Initial state: offscreen below
  visible: { opacity: 1, y: 0 }, // Animate to visible
};

const Availability = () => {
  const { data: session } = useSession();
  const [schedule, setSchedule] = useState(null);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Fetching the schedule of the user.
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!session?.user?.MeetingCardID) return;

      try {
        const res = await fetch(
          `/api/schedule/fetcchSchedule?MeetingCardID=${session.user.MeetingCardID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        console.log("data", data);

        setSchedule(data.schedule);

        if (!res.ok) {
          console.error("Error:", data.error);
          return;
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSchedule();
  }, [session?.user?.MeetingCardID]);

  return (
    <div className="w-full h-full text-white flex flex-col justify-start items-center">
      {/* Header */}
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
          <h1 className="text-2xl font-semibold text-white">Working Hours</h1>
          <p className="text-sm text-neutral-400 mt-1">
            Configure your available working hours for client bookings.
          </p>
        </div>

        {/* Right Section (Button) */}
        <div className="flex items-center justify-end">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, ease: "easeInOut" }}
            className="px-5 py-2 rounded-lg border border-white/20 bg-white/5 text-white hover:bg-white hover:text-black hover:border-black backdrop-blur-md font-medium text-sm transition-all duration-200 active:scale-95 cursor-pointer"
          >
            Save
          </motion.button>
        </div>
      </motion.div>

      <div className="w-full hide-scrollbar h-[90%] flex flex-col px-4 mt-4 overflow-y-auto">
        {/* Days Section */}
        {schedule && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
            className="w-full flex flex-wrap gap-6 justify-start items-start"
          >
            {days.map((day) => (
              <UpdateScheduleForm key={day} day={day} dayData={schedule[day]} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Availability;
