import {
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { api } from "@utils/api";
import { useZodForm } from "@utils/form";
import { addQuestionSchema } from "@utils/zodSchema";

const QuestionInput = (props: { talkSessionId: string }) => {
  const talkSessionRouter = api.useContext().talkSession;
  const addQuestionMutation = api.question.addQuestion.useMutation({
    async onSuccess() {
      await talkSessionRouter.getAllQuestionInSession.invalidate();
    },
  });

  const form = useZodForm({
    schema: addQuestionSchema,
    defaultValues: { question: "" },
    values: { question: "", talkSessionId: props.talkSessionId },
  });

  return (
    <form
      onSubmit={
        void form.handleSubmit(
          (values) =>
            addQuestionMutation.mutate(values, {
              onSuccess: () => form.reset(),
            }),
          (error) => console.table(error)
        )
      }
      className="space-y-2"
    >
      <input type="hidden" {...form.register("talkSessionId")} />
      <div className="flex flex-row gap-2">
        <input
          {...form.register("question")}
          placeholder="Enter a question"
          className="relative block w-full flex-grow appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />

        <button
          type="submit"
          disabled={addQuestionMutation.isLoading}
          className="inline-flex items-center gap-2 rounded bg-[#461091] p-2 align-middle text-sm font-semibold text-white hover:bg-[#2e026d]"
        >
          {addQuestionMutation.isLoading ? (
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          ) : (
            <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {form.formState.errors.question?.message && (
        <p className="text-red-700">Please enter a question</p>
      )}
    </form>
  );
};

export default QuestionInput;
