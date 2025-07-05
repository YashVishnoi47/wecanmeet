"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import UseLivePageStore from "@/store/LivepageStore";
import { generateTimeSlots } from "@/lib/utils";
import { useSession } from "next-auth/react";

const MeetingCardComp = ({ workingDays }) => {
  const today = new Date();
  const { data: session } = useSession();
  const [clientFormDetails, setClientFormDetails] = useState({
    clientName: "",
    clientEmail: "",
    clientMsg: "",
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
  const onSubmit = async () => {
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
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.error);
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fieldAnim = {
    initial: { opacity: 0, y: 20 }, // Starts faded + pushed down
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }, // Fade in with slide
  };

  return (
    <div className="w-full h-full flex justify-center gap-2 items-center ">
      {step === 1 ? (
        <div className="w-full h-full flex justify-center items-center">
          {/* Owner Info */}
          <div className="w-[20%] h-[70%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center gap-6 p-4 shadow-md">
            {/* Profile Picture */}
            <div className="w-[90px] h-[90px] rounded-full border border-gray-400 bg-gray-800 flex items-center justify-center overflow-hidden">
              {/* Replace with actual image */}
              <span className="text-white text-xl font-semibold">👤</span>
            </div>

            {/* Owner Info */}
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">
                Yash Bishnoi
              </h1>
              <p className="text-sm text-gray-300 mt-1">
                Full Stack Developer | Building AI & Web
              </p>
            </div>
          </div>

          {/* Calender */}
          <div className="w-[30%] h-[70%]  backdrop-blur-md border-white/20 rounded-2xl flex flex-col items-center justify-start gap-6 shadow-md">
            {/* Calender */}
            <div className="relative select-none w-full max-w-md rounded-2xl shadow-lg bg-zinc-900 text-white p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300">
              {/* Calendar */}
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                animate
                timeZone="UTC"
                disabled={disabledDays}
                className="w-full text-lg
      [&_.rdp]:w-full
      [&_.rdp-month]:flex [&_.rdp-month]:flex-col 
      [&_.rdp-month]:gap-6
      [&_.rdp-caption]:justify-center
      [&_.rdp-caption_label]:text-2xl 
      [&_.rdp-caption_label]:font-semibold
      [&_.rdp-head_row]:grid [&_.rdp-head_row]:grid-cols-7
      [&_.rdp-table]:w-full
      [&_.rdp-tbody]:grid [&_.rdp-tbody]:grid-cols-7 
      [&_.rdp-tbody]:gap-2
      [&_.rdp-cell]:w-full 
      [&_.rdp-day]:w-full h-full flex items-center justify-center
      [&_.rdp-day]:rounded-xl [&_.rdp-day]:transition-all
      [&_.rdp-day]:duration-300 [&_.rdp-day]:ease-in-out
      [&_.rdp-day]:outline-none [&_.rdp-day]:font-medium
      [&_.rdp-day:hover]:rounded-2xl
      [&_.rdp-day:hover]:bg-white/10
      [&_.rdp-day:hover]:text-white
      "
                classNames={{
                  today: `bg-white/10 text-white font-semibold rounded-full`,
                  selected: `bg-white text-black font-bold rounded-xl scale-105 shadow-md transition-all duration-300 ease-in-out`,
                }}
              />

              {/* Selected Date Display */}
              <div className="w-full border-t border-white/10 pt-4">
                {selected !== "" ? (
                  <p className="text-center text-white text-sm sm:text-base font-medium flex justify-center items-center gap-2">
                    {selected && `📅`}{" "}
                    {selected &&
                      selected.toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    {time && <span>{time}</span>}
                  </p>
                ) : (
                  <p className="text-center text-white/60 text-base font-medium">
                    Select a date to continue
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Timings */}
          <div className="w-[15%] h-[70%] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center gap-4 p-3 shadow-md text-white overflow-y-auto hide-scrollbar select-none">
            <h1 className="w-full border-b flex justify-center items-center py-2 text-md font-medium">
              Select Time
            </h1>
            {timeOptions.map((item, idx) => (
              <p
                onClick={() => (time === item ? settime("") : settime(item))}
                key={idx}
                className={`w-full text-center py-2 px-3 border border-white/20 rounded-xl cursor-pointer transition duration-200 hover:bg-white hover:text-black active:scale-95 text-sm ${
                  time === item && "bg-white  text-black"
                }`}
              >
                {item}
              </p>
            ))}
          </div>

          <button
            className="border-2 p-2 rounded-4xl"
            onClick={() => setStep(2)}
          >
            Next
          </button>
        </div>
      ) : (
        <motion.div
          initial="initial"
          animate="animate"
          className="w-full max-w-xl mx-auto px-6 py-10 bg-neutral-950 text-white rounded-2xl shadow-xl space-y-8 border border-white/10"
        >
          {/* Header */}
          <motion.h2
            variants={fieldAnim}
            className="text-2xl md:text-3xl font-semibold text-center tracking-tight"
          >
            Contact Us
          </motion.h2>

          {/* Name Field */}
          <motion.div variants={fieldAnim} className="relative">
            <input
              type="text"
              name="name"
              onChange={(e) =>
                setClientFormDetails((prev) => ({
                  ...prev,
                  clientName: e.target.value,
                }))
              }
              required
              placeholder="Your Name"
              className="peer w-full bg-neutral-900 border border-white/20 rounded-lg px-4 pt-5 pb-2 text-white placeholder-transparent focus:outline-none focus:border-white transition duration-300"
            />
            <label
              htmlFor="name"
              className="absolute left-4 top-2 text-sm text-white/60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white/60"
            >
              Name
            </label>
          </motion.div>

          {/* Email Field */}
          <motion.div variants={fieldAnim} className="relative">
            <input
              type="email"
              name="email"
              onChange={(e) =>
                setClientFormDetails((prev) => ({
                  ...prev,
                  clientEmail: e.target.value,
                }))
              }
              required
              placeholder="Your Email"
              className="peer w-full bg-neutral-900 border border-white/20 rounded-lg px-4 pt-5 pb-2 text-white placeholder-transparent focus:outline-none focus:border-white transition duration-300"
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-sm text-white/60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white/60"
            >
              Email
            </label>
          </motion.div>

          {/* Message Field */}
          <motion.div variants={fieldAnim} className="relative">
            <textarea
              name="message"
              rows="4"
              required
              onChange={(e) =>
                setClientFormDetails((prev) => ({
                  ...prev,
                  clientMsg: e.target.value,
                }))
              }
              placeholder="Your Message"
              className="peer w-full bg-neutral-900 border border-white/20 rounded-lg px-4 pt-5 pb-2 text-white placeholder-transparent focus:outline-none focus:border-white transition duration-300 resize-none"
            />
            <label
              htmlFor="message"
              className="absolute left-4 top-2 text-sm text-white/60 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-2 peer-focus:text-sm peer-focus:text-white/60"
            >
              Message
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            onClick={onSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 mt-2 rounded-lg bg-white text-black font-medium tracking-wide transition hover:bg-white/90"
          >
            Book Meeting
          </motion.button>

          <button
            className="border-2 p-2 rounded-4xl"
            onClick={() => setStep(1)}
          >
            Back
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default MeetingCardComp;
