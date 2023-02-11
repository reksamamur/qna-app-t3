import { z } from "zod";

import type { TalkSession } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const talkSessionRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.talkSession.findMany({
      where: { userId: { equals: ctx.session.user.id } },
    });
  }),

  addTalkSession: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.talkSession.create({
        select: { id: true },
        data: { name: input.name, userId: ctx.session.user.id },
      });
    }),

  getAllQuestionInSession: protectedProcedure
    .input(z.object({ talkSessionId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const cachedTalkSession = await ctx.cache.get<TalkSession>(
        input.talkSessionId
      );

      if (cachedTalkSession) return cachedTalkSession;

      const talkSession = await ctx.prisma.talkSession.findFirst({
        where: { id: { equals: input.talkSessionId } },
        include: {
          question: true,
        },
      });

      if (!talkSession) return undefined;

      await ctx.cache.set<TalkSession>(input.talkSessionId, talkSession);

      return talkSession;
    }),
});
