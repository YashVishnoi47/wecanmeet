"use client";

import { z } from "zod";

export const signUpFormSchema = z.object({
  userName: z.string().min(2).max(50),
  Email: z.string().min(2).max(50),
  FullName: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});
