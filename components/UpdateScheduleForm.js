"use client";
import React from "react";
import { Switch } from "./ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateScheduleForm = ({ day, dayData, onChange }) => {
  // Handler to update working toggle
  const toggleWork = () => {
    onChange(day, {
      ...dayData,
      isWorking: !dayData.isWorking,
    });
  };

  // Handler to update time values
  const updateTime = (key, value) => {
    onChange(day, {
      ...dayData,
      timeSlots: {
        ...dayData.timeSlots,
        [key]: value,
      },
    });
  };

  return (
    <div className="w-full max-w-[38rem] border border-neutral-800 bg-black/30 backdrop-blur-md rounded-2xl px-6 py-6 space-y-5">
      <div className="flex justify-between items-center bg-neutral-800/60 rounded-full px-5 py-2.5">
        <h2 className="text-lg text-white">{day}</h2>
        <Switch
          id={day}
          checked={dayData.isWorking}
          onCheckedChange={toggleWork}
          className="data-[state=checked]:bg-white data-[state=unchecked]:bg-neutral-600"
        />
      </div>

      {dayData.isWorking ? (
        <div className="flex gap-6">
          {/* Start Time */}
          <div className="flex flex-col space-y-1">
            <Label className="text-neutral-400 text-xs">Start</Label>
            <Input
              type="time"
              step="900"
              value={dayData.timeSlots.start}
              onChange={(e) => updateTime("start", e.target.value)}
              className="bg-neutral-800 text-white"
            />
          </div>

          {/* End Time */}
          <div className="flex flex-col space-y-1">
            <Label className="text-neutral-400 text-xs">End</Label>
            <Input
              type="time"
              step="900"
              value={dayData.timeSlots.end}
              onChange={(e) => updateTime("end", e.target.value)}
              className="bg-neutral-800 text-white"
            />
          </div>
        </div>
      ) : (
        <p className="text-sm italic text-neutral-400">Not working today</p>
      )}
    </div>
  );
};

export default UpdateScheduleForm;
