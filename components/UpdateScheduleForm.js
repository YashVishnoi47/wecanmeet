"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

const UpdateScheduleForm = ({ dayData, day }) => {
  const [work, setWork] = useState(dayData.idWorking);

  useEffect(() => {
    setWork(dayData.isWorking);
  }, [dayData.isWorking]);

  return (
    <div className="w-full max-w-[38rem] flex flex-col items-start border border-neutral-800 bg-black/30 backdrop-blur-md rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] px-6 py-6 space-y-5 transition-all duration-300 min-h-[12rem]">
      {/* Header pill with day and toggle */}
      <div className="w-full flex justify-between items-center bg-neutral-800/60 rounded-full px-5 py-2.5">
        <h2 className="text-base sm:text-lg font-medium text-white tracking-wide">
          {day}
        </h2>

        <Switch
          id={day}
          checked={work === true}
          onCheckedChange={() => setWork(!work)}
          className="data-[state=checked]:bg-white data-[state=unchecked]:bg-neutral-600 transition-colors duration-200"
        />
      </div>

      {/* Consistent height block */}
      <div className="w-full h-[4rem] flex items-start">
        {work ? (
          <p className="text-sm text-neutral-400 leading-relaxed">
            Add working hours or time slots here.
          </p>
        ) : (
          // Placeholder for equal height when not working
          <div className="text-sm text-neutral-600 opacity-30 italic">
            Not working today
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateScheduleForm;

{
  /* {work === true && (
          <div className="mt-2 space-y-2 border-2 h-full">
            {dayData.timeSlots.map((slot, index) => (
              <div
                key={index}
                className="text-sm text-white border border-white"
              >
                {slot.start} - {slot.end}
              </div>
            ))}
          </div>
        )} */
}
