import { z } from "zod";

export const addTalkSessionSchema = z.object({ name: z.string().min(1) });

export const addQuestionSchema = z.object({
  talkSessionId: z.string().min(1),
  question: z.string().min(1),
});
