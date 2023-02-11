import { z } from "zod";

import type { Question, TalkSession, User } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { addTalkSessionSchema } from "../../../utils/zodSchema";

export const talkSessionRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.talkSession.findMany({
      where: { userId: { equals: ctx.session.user.id } },
    });
  }),

  addTalkSession: protectedProcedure
    .input(addTalkSessionSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.talkSession.create({
        select: { id: true },
        data: { name: input.name, userId: ctx.session.user.id },
      });
    }),

  getAllQuestionInSession: protectedProcedure
    .input(z.object({ talkSessionId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      type TalkSessionIncludeQuestionAndUser = TalkSession & {
        question: (Question & {
          user: User;
        })[];
      };

      const cachedTalkSession =
        await ctx.cache.get<TalkSessionIncludeQuestionAndUser>(
          input.talkSessionId
        );

      if (cachedTalkSession) {
        console.log("from cache");
        return cachedTalkSession;
      }

      const talkSession = await ctx.prisma.talkSession.findFirst({
        where: { id: { equals: input.talkSessionId } },
        include: {
          question: {
            include: { user: true },
          },
        },
      });

      if (!talkSession) return undefined;

      await ctx.cache.set<TalkSessionIncludeQuestionAndUser>(
        input.talkSessionId,
        talkSession
      );

      return talkSession;
    }),
});
