"use client";
import React from "react";
import UseUserStore from "@/store/userStore";
import Topbar from "./Topbar";
import { motion } from "framer-motion";
import { CalendarDays, Clock, User, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
const Meetings = ({ handleComplete }) => {
  const { userMeetings, filter, setFilter } = UseUserStore();

  const filteredMeetings = Object.values(userMeetings).filter((meeting) => {
    if (filter === "pending") return meeting.completed === false;
    return true;
  });

  return (
    <div className="w-full h-[98%] flex flex-col justify-start gap- items-center">
      {/* Top bar */}
      <div className="w-[98%] flex justify-center items-center py-4">
        <Topbar
          Heading="Your Meetings"
          text="Here are your scheduled meetings."
        />
      </div>

      {/* Main Container*/}
      <div className="w-[98%] h-[80%] bg-black/40 backdrop-blur-md border-white/10  rounded-2xl overflow-hidden flex flex-col gap-6">
        {/* Filter Buttons  */}
        {filteredMeetings.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full px-2 flex items-center  gap-3 border-/10 bg-black/30"
          >
            {[
              { label: "All Meetings", value: "all" },
              { label: "Pending", value: "pending" },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border border-white/20 
          ${
            filter === value
              ? "bg-white text-black"
              : "bg-white/5 text-white hover:bg-white hover:text-black"
          }`}
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Meeting Cards Grid */}
        <div className="w-full h-full flex flex-wrap gap-6 overflow-y-auto items-start">
          {filteredMeetings.length > 0 ? (
            filteredMeetings.map((item, idx) => (
              <Dialog key={idx}>
                {/* Trigger Card */}
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.2,
                    }}
                    className="w-full max-w-sm p-5 space-y-3 bg-white/5 text-white border border-white/10 rounded-xl shadow-md backdrop-blur-md hover:shadow-white/10 cursor-pointer transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">Meeting</h2>
                      <span
                        className={`text-xs font-medium ${
                          item.completed
                            ? "text-green-400/60"
                            : "text-red-400/60"
                        }`}
                      >
                        {item.completed ? "Completed" : "Pending"}
                      </span>
                    </div>

                    {/* Basic Info Rows */}
                    <div className="space-y-2 text-sm">
                      {/* Client Name */}
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-white/60" />
                        <span className="text-white/90">{item.clientName}</span>
                      </div>

                      {/* Email (short) */}
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-white/60" />
                        <span className="truncate max-w-[200px] text-white/70">
                          {item.clientEmail}
                        </span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-white/60" />
                        <span>
                          {new Date(item.meetingdate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-white/60" />
                        <span>{item.meetingTime}</span>
                      </div>
                    </div>
                  </motion.div>
                </DialogTrigger>

                {/* Full Info Dialog */}
                <DialogContent className="sm:max-w-lg bg-black text-white border-none p-6 backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                      Meeting Details
                    </DialogTitle>
                    <DialogDescription className="text-white/60 text-sm">
                      Full information about the selected meeting.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 space-y-4 text-sm">
                    <InfoRow
                      icon={<User size={16} />}
                      label="Client"
                      value={item.clientName}
                    />
                    <InfoRow
                      icon={<Mail size={16} />}
                      label="Email"
                      value={item.clientEmail}
                    />
                    <InfoRow
                      icon={<CalendarDays size={16} />}
                      label="Date"
                      value={new Date(item.meetingdate).toLocaleDateString(
                        "en-IN",
                        {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    />
                    <InfoRow
                      icon={<Clock size={16} />}
                      label="Time"
                      value={item.meetingTime}
                    />

                    {/* Message */}
                    {item.clientMsg && (
                      <div>
                        <p className="text-white/60 text-xs">Message</p>
                        <p className="text-white mt-1 text-sm">
                          {item.clientMsg}
                        </p>
                      </div>
                    )}

                    {/* Mark Complete */}
                    {!item.completed && (
                      <button
                        onClick={() => handleComplete(true, item._id)}
                        className="mt-4 px-4 py-2 bg-white/10 text-red-400 hover:text-red-200 border border-white/20 rounded-md transition-all duration-200"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="w-full flex justify-center items-center p-8">
              <div className="text-center bg-neutral-900 text-white/60 border border-white/10 px-6 py-5 rounded-xl shadow-sm">
                <p className="text-sm">No meetings available</p>
                <p className="text-xs mt-1 text-white/30">
                  You haven’t scheduled any yet.
                </p>
              </div>
            </div>
          )}
        </div>
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
