import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const generateTimeSlots = (start, end, stepMinutes = 30) => {
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  const startTotal = startHour * 60 + startMin;
  const endTotal = endHour * 60 + endMin;

  const slots = [];

  for (let mins = startTotal; mins < endTotal; mins += stepMinutes) {
    const hour = Math.floor(mins / 60);
    const minute = mins % 60;

    const formatted = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    slots.push(formatted);
  }

  return slots;
};
