import { z } from "zod";

export const addTalkSessionSchema = z.object({ name: z.string().min(1) });

export const addQuestionSchema = z.object({
  talkSessionId: z.string().min(1),
  question: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  // Don't do this, it is for demo purpose only
  password: z.string().min(3),
});
