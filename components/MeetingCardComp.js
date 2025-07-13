"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import UseLivePageStore from "@/store/LivepageStore";
import { generateTimeSlots } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MeetingCardComp = ({ workingDays }) => {
  const today = new Date();
  const { data: session } = useSession();
  const [clientFormDetails, setClientFormDetails] = useState({
    clientName: "",
    clientEmail: "",
    clientMsg: "",
    meetingDuration: "",
    meetingMode: "",
  });
  const {
    schedule,
    timeRange,
    setTimeRange,
    selected,
    setSelected,
    SelectedWeakDay,
    setSelectedWeakDay,
    time,
    settime,
    TimeFormat,
    step,
    setStep,
    meetting,
    setMeetting,
  } = UseLivePageStore();

  const dayNameToNumber = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  // Computing Non-Working Days
  const allDays = Object.keys(dayNameToNumber);
  const nonWorkingDays = allDays.filter((day) => !workingDays.includes(day));
  const disabledDays = [
    { before: today },
    ...nonWorkingDays.map((day) => ({
      dayOfWeek: [dayNameToNumber[day]],
    })),
  ];

  //  Update week day when user selects a date
  useEffect(() => {
    if (selected) {
      const weekDay = selected.toLocaleDateString("en-US", {
        weekday: "long",
      });
      setSelectedWeakDay(weekDay);
    }
  }, [selected]);

  // Time Slots
  const timeOptions = generateTimeSlots(
    timeRange.start,
    timeRange.end,
    30,
    TimeFormat
  );

  //  When week day is updated, filter schedule
  useEffect(() => {
    if (SelectedWeakDay) {
      const selectedDayData = Object.entries(schedule).filter(
        ([day]) => day === SelectedWeakDay
      );

      console.log("Selected Day Schedule:", selectedDayData);
      if (selectedDayData.length > 0) {
        const dayData = selectedDayData[0][1];
        const timeSlots = dayData.timeSlots;

        setTimeRange({ start: timeSlots.start, end: timeSlots.end });
      }
    }
  }, [SelectedWeakDay, schedule]);

  // Function to conform the meeting.
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = selected.toISOString().split("T")[0];
      const res = await fetch("/api/meeting/createMeeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          clientName: clientFormDetails.clientName,
          clientEmail: clientFormDetails.clientEmail,
          clientMsg: clientFormDetails.clientMsg,
          meetingDate: formattedDate,
          meetingTime: time,
          ownerID: session?.user._id,
          meetingDuration: clientFormDetails.meetingDuration,
          meetingMode: clientFormDetails.meetingMode,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
      }

      // console.log(data);
      setMeetting(data.meeting);
    } catch (error) {
      console.error(error);
    }
  };

  const setTimeAndRedirect = (item) => {
    time === item ? settime("") : settime(item);
    setStep(2);
  };

  return (
    <div className="w-full h-full flex justify-center gap-2 items-center">
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] px-6 py-8">
          <div className="w-[90%] max-w-6xl h-[85%] bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl flex justify-between items-center overflow-hidden">
            {/* Sidebar (User + Meeting Info) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full w-[32%] border-r border-white/10 p-6 flex flex-col justify-start gap-6 bg-gradient-to-b from-white/5 to-white/0"
            >
              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-xl font-semibold">
                  U
                </div>
                <div className="flex flex-col">
                  <p className="text-white text-lg font-semibold capitalize">
                    {session?.user.FullName}
                  </p>
                  <a
                    href={`mailto:${session?.user.Email}`}
                    className="text-white/60 text-sm underline hover:text-white transition"
                  >
                    {session?.user.Email}
                  </a>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              {/* Meeting Info */}
              <div className="flex flex-col gap-4">
                <h2 className="text-white text-base font-semibold">
                  Meeting Info
                </h2>

                {[
                  [
                    "Date",
                    selected
                      ? selected.toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Not selected",
                  ],
                  ["Time", time || "Not selected"],
                  [
                    "Duration (Min)",
                    clientFormDetails.meetingDuration || "Not selected",
                  ],
                  ["With", clientFormDetails.clientName || "Not selected"],
                  // ["Timezone", "IST (GMT+5:30)"],
                  ["Mode", clientFormDetails.meetingMode || "Online"],
                ].map(([label, value], idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-white/80"
                  >
                    <span>{label}:</span>
                    <span className="text-right">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Calendar + Time Slots */}
            {step === 1 ? (
              <AnimatePresence>
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  // exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-[68%] flex justify-center items-center gap-4 p-6"
                >
                  {/* Calendar */}
                  <div className="h-full w-[60%] bg-black/40 rounded-2xl backdrop-blur-lg shadow-inner p-6 flex flex-col justify-start items-center">
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={setSelected}
                      animate
                      timeZone="UTC"
                      disabled={disabledDays}
                      className="text-lg"
                      classNames={{
                        day: ` hover:bg-white/10 hover:text-white rounded-md transition-all duration-300 ease-in-out`,
                        today: `bg-white/10 text-white font-semibold rounded-md`,
                        selected: `bg-white text-black font-bold rounded-md shadow-md transition-all duration-300 ease-in-out`,
                      }}
                    />
                  </div>

                  {/* Time Slots */}
                  <div className="w-[40%] h-full rounded-2xl backdrop-blur-lg shadow-inner p-4 flex flex-col">
                    <div className="w-full text-center text-white text-base font-medium py-2 border-b border-white/10">
                      {selected
                        ? `📅 ${selected.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}`
                        : "Select a date"}
                    </div>

                    <div className="flex-1 items-center overflow-y-auto hide-scrollbar mt-4 flex flex-col gap-2">
                      {timeOptions.map((item, idx) => (
                        <motion.p
                          key={idx}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          onClick={() => selected && setTimeAndRedirect(item)}
                          className={`w-[98%] text-center py-2 px-4 rounded-md border text-sm transition-all ${
                            selected
                              ? "cursor-pointer border-white/20 hover:bg-white/10 hover:border-white"
                              : "cursor-not-allowed opacity-40 pointer-events-none border-white/10"
                          } ${
                            time === item
                              ? "bg-white text-black font-medium"
                              : "text-white"
                          }`}
                        >
                          {item}
                        </motion.p>
                      ))}

                      {!selected && (
                        <p className="text-xs text-white/50 text-center mt-4">
                          Please select a date to choose a time slot.
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <AnimatePresence>
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-[68%] p-6 rounded-2xl bg-black/40 backdrop-blur-lg shadow-inner flex flex-col gap-6"
                >
                  {/* Heading */}
                  <h2 className="text-white text-xl font-semibold">
                    Client & Meeting Details
                  </h2>

                  {/* Form */}
                  <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-2 gap-6 text-sm text-white"
                  >
                    {/* Left Column */}
                    <div className="flex flex-col gap-4">
                      {/* Client Name */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="clientName" className="text-white/80">
                          Client Name
                        </label>
                        <input
                          onChange={(e) =>
                            setClientFormDetails((prev) => ({
                              ...prev,
                              clientName: e.target.value,
                            }))
                          }
                          id="clientName"
                          type="text"
                          required
                          placeholder="Enter full name"
                          className="bg-white/10 border border-white/20 rounded-md px-4 py-2 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                      </div>

                      {/* Client Email */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="clientEmail" className="text-white/80">
                          Client Email
                        </label>
                        <input
                          onChange={(e) =>
                            setClientFormDetails((prev) => ({
                              ...prev,
                              clientEmail: e.target.value,
                            }))
                          }
                          id="clientEmail"
                          type="email"
                          required
                          placeholder="example@email.com"
                          className="bg-white/10 border border-white/20 rounded-md px-4 py-2 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="message" className="text-white/80">
                          Message (Optional)
                        </label>
                        <textarea
                          onChange={(e) =>
                            setClientFormDetails((prev) => ({
                              ...prev,
                              clientMsg: e.target.value,
                            }))
                          }
                          id="message"
                          rows="5"
                          placeholder="Write your message here..."
                          className="bg-white/10 border border-white/20 rounded-md px-4 py-2 text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-white/30"
                        ></textarea>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4">
                      {/* Meeting Duration */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="duration" className="text-white/80">
                          Meeting Duration
                        </label>
                        <Select
                          required
                          onValueChange={(value) =>
                            setClientFormDetails((prev) => ({
                              ...prev,
                              meetingDuration: value,
                            }))
                          }
                        >
                          <SelectTrigger className="w-full bg-white/10 border border-white/20 text-white rounded-md focus:ring-white/30 focus:outline-none focus:ring-2">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent className="bg-black text-white border-white/20">
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Meeting Mode */}
                      <div className="flex flex-col gap-1">
                        <label htmlFor="mode" className="text-white/80">
                          Meeting Mode
                        </label>
                        <Select
                          onValueChange={(value) =>
                            setClientFormDetails((prev) => ({
                              ...prev,
                              meetingMode: value,
                            }))
                          }
                          required
                        >
                          <SelectTrigger className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30">
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent className="bg-black text-white border border-white/20 rounded-md">
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="px-6 mt-27 py-2 bg-white text-black font-medium rounded-md hover:bg-white/90 active:scale-95 transition"
                      >
                        Confirm Meeting
                      </button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCardComp;

{
  /* <div className="w-[60%] h-[20%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center gap-6 p-4 shadow-md">
            Profile Picture
            <div className="w-[90px] h-[90px] rounded-full border border-gray-400 bg-gray-800 flex items-center justify-center overflow-hidden">
              Replace with actual image
              <span className="text-white text-xl font-semibold">👤</span>
            </div>

            Owner Info
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                Yash Bishnoi
              </h1>
              <p className="text-sm text-gray-300 mt-1">
                Full Stack Developer | Building AI & Web
              </p>
            </div>
          </div> */
}
