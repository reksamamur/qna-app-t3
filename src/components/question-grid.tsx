import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import type { Question, User } from "@prisma/client";
import { api } from "@utils/api";
import { classNames } from "@utils/utils";
import QuestionCard from "./question-card";

const QuestionGrid = (props: {
  questions?: (Question & {
    user: User;
  })[];
  isAnswered: boolean;
}) => {
  const talkSessionRouter = api.useContext().talkSession;
  const markAsAnsweredMutation =
    api.question.markQuestionAsAnswered.useMutation({
      async onSuccess() {
        await talkSessionRouter.getAllQuestionInSession.invalidate();
      },
    });

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
      {props.questions
        ?.filter((question) => question.isAnswered === props.isAnswered)
        .map((question) => (
          <QuestionCard key={question.id} question={question}>
            <span className="text-gray-500">{question.user.email}</span>
            <button
              disabled={question.isAnswered}
              onClick={() =>
                markAsAnsweredMutation.mutate({
                  questionId: question.id,
                })
              }
              className={classNames(
                question.isAnswered
                  ? "cursor-not-allowed bg-[#4610919d]"
                  : "bg-[#461091] hover:bg-[#2e026d] focus:outline-none focus:ring-4 focus:ring-blue-300",
                "inline-flex h-10 items-center gap-2 rounded px-3 py-2 text-center text-sm font-semibold text-white"
              )}
            >
              Answered
              <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </QuestionCard>
        ))}
    </div>
  );
};

export default QuestionGrid;
