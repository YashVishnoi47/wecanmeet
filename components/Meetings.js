"use client";
import React from "react";
import { useSession } from "next-auth/react";
import UseUserStore from "@/store/userStore";
import Topbar from "./Topbar";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Mail } from "lucide-react";

const Meetings = () => {
  const { userMeetings } = UseUserStore();

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <Topbar
        Heading="Your Meetings"
        text="Here are your scheduled meetings."
      />

      <div className="w-full h-[90%] flex justify-start items-start gap-6 p-4">
        {userMeetings.length > 0
          ? userMeetings.map((item, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }} // Animate from below
                key={idx}
                animate={{ opacity: 1, y: 0 }} // Slide in
                transition={{ duration: 0.4, ease: "easeOut" }} // Smooth
                className="w-full max-w-md bg-neutral-900/80 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-lg text-white space-y-4 hover:shadow-white/10 transition-shadow duration-300"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-wide">
                    Meeting Info
                  </h2>
                  <span className="text-sm text-white/40">Confirmed</span>
                </div>

                {/* Info Rows */}
                <div className="space-y-3 text-sm">
                  {/* Name */}
                  <InfoRow
                    icon={<User size={16} />}
                    label="Client"
                    value={item.clientName}
                  />
                  {/* Email */}
                  <InfoRow
                    icon={<Mail size={16} />}
                    label="Email"
                    value={item.clientEmail}
                  />
                  {/* Date */}
                  <InfoRow
                    icon={<CalendarDays size={16} />}
                    label="Date"
                    value={new Date(item.meetingdate).toLocaleDateString(
                      "en-IN",
                      {
                        weekday: "short", // e.g., Tue
                        year: "numeric", // e.g., 2025
                        month: "long", // e.g., July
                        day: "numeric", // e.g., 8
                      }
                    )}
                  />
                  {/* Time */}
                  <InfoRow
                    icon={<Clock size={16} />}
                    label="Time"
                    value={item.meetingTime}
                  />
                  {/* Message */}
                  {item.clientMsg && (
                    <div className="pt-2">
                      <p className="text-white/60 text-xs">Message</p>
                      <p className="text-white text-sm mt-1">
                        {item.clientMsg}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          : "No meeting available"}
      </div>
    </div>
  );
};

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-white/90">
      <div className="flex items-center gap-2 text-white/50 w-24">
        {icon}
        <span>{label}</span>
      </div>
      <p className="text-white truncate">{value}</p>
    </div>
  );
}
export default Meetings;
