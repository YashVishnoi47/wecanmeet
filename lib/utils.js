import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateTimeSlots = (
  start,
  end,
  stepMinutes = 30,
  format = "24hr"
) => {
  // ⏰ Split and convert start/end to total minutes
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  const startTotal = startHour * 60 + startMin;
  const endTotal = endHour * 60 + endMin;

  const slots = [];

  // 🔁 Loop through and generate time slots
  for (let mins = startTotal; mins < endTotal; mins += stepMinutes) {
    const hour = Math.floor(mins / 60);
    const minute = mins % 60;

    let formattedTime;

    // ✅ 12-hour format
    if (format === "12hr") {
      const hour12 = hour % 12 || 12;
      const ampm = hour < 12 ? "AM" : "PM";
      formattedTime = `${hour12.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")} ${ampm}`;
    }

    // ✅ 24-hour format
    else {
      formattedTime = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
    }

    slots.push(formattedTime);
  }

  return slots;
};
