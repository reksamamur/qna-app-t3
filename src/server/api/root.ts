import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { questionRouter } from "./routers/question";
import { talkSessionRouter } from "./routers/talkSession";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  question: questionRouter,
  talkSession: talkSessionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
