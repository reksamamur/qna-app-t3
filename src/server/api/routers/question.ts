import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { addQuestionSchema } from "../../../utils/zodSchema";

export const questionRouter = createTRPCRouter({
  getAllByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany({
      where: { userId: { equals: ctx.session.user.id } },
      include: { talkSession: true },
    });
  }),

  addQuestion: protectedProcedure
    .input(addQuestionSchema)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.prisma.question.create({
        select: { id: true },
        data: {
          question: input.question,
          talkSessionId: input.talkSessionId,
          userId: ctx.session.user.id,
        },
      });

      await ctx.cache.delete(input.talkSessionId);

      return result;
    }),

  markQuestionAsAnswered: protectedProcedure
    .input(z.object({ questionId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const question = await ctx.prisma.question.findFirst({
        where: { id: { equals: input.questionId } },
        include: { talkSession: true },
      });

      if (!question) throw new Error("Not Found");

      const isOwnerOfTalkSession =
        question.talkSession.userId === ctx.session.user.id;
      if (!isOwnerOfTalkSession) throw new Error("Not Authorized");

      const result = await ctx.prisma.question.update({
        where: { id: question.id },
        data: { isAnswered: true },
      });

      await ctx.cache.delete(question.talkSessionId);

      return result;
    }),
});
