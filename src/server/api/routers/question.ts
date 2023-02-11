import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const questionRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany({
      where: { userId: { equals: ctx.session.user.id } },
      include: { talkSession: true },
    });
  }),

  addQuestion: protectedProcedure
    .input(
      z.object({
        talkSessionId: z.string().min(1),
        question: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.question.create({
        data: {
          question: input.question,
          talkSessionId: input.talkSessionId,
          userId: ctx.session.user.id,
        },
      });
    }),

  markQuestionAsAnswered: protectedProcedure
    .input(z.object({ questionId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findFirst({
        where: { id: { equals: input.questionId } },
        include: { talkSession: true },
      });

      if (!question) return null;

      const isOwnerOfTalkSession =
        question.talkSession.userId !== ctx.session.user.id;
      if (!isOwnerOfTalkSession) return null;

      return await ctx.prisma.question.update({
        where: { id: question.id },
        data: { isAnswered: true },
      });
    }),
});
