"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import UpdateScheduleForm from "./UpdateScheduleForm";
import Topbar from "./Topbar";

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
        // console.log("data", data);

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

  // Function to Save the updated Schedule.
  const handleChange = (day, updatedDayData) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: updatedDayData,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/schedule/updateSchedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingCardId: session.user.MeetingCardID,
          schedule,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Schedule updated successfully");
      } else {
        alert(result.error || "Error updating schedule");
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="w-full h-[98%] text-white flex flex-col justify-start items-center">
      {/* Header */}

      <div className="w-[98%] flex justify-center items-center py-4">
        <Topbar
          Heading={"Working Hours"}
          text={" Configure your available working hours for client bookings."}
          handleSave={handleSave}
        />
      </div>

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
              <UpdateScheduleForm
                key={day}
                day={day}
                dayData={schedule[day]}
                onChange={handleChange}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* <button onClick={handleSave}>Save</button> */}
    </div>
  );
};

export default Availability;
