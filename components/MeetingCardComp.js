"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import UseLivePageStore from "@/store/LivepageStore";
import { generateTimeSlots } from "@/lib/utils";
import { useSession } from "next-auth/react";

const MeetingCardComp = ({ workingDays }) => {
  const { data: session } = useSession();
  const today = new Date();
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
    setTimeFormat,
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
          clientName: "Name",
          clientEmail: "cubeer742@gmail.com",
          clientMsg: "MSG",
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

  return (
    <div className="w-full h-full flex justify-center gap-2 items-center ">
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

      <button className="border-2 p-2 rounded-4xl" onClick={onSubmit}>
        Book
      </button>
    </div>
  );
};

export default MeetingCardComp;
