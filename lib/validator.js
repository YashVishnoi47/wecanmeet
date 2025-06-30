"use client";

import { z } from "zod";

export const signUpFormSchema = z.object({
  userName: z.string().min(2).max(50),
  Email: z.string().min(2).max(50),
  FullName: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

export const MeetingFormSchema = z.object({
  clientName: z.string().min(2).max(50),
  clientEmail: z.string().min(2).max(50),
  message: z.string().min(2).max(50),
  MeetingPlace: z.string().min(2).max(50),
  MeetingTime: z.string().min(2).max(50),
});
