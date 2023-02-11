import { useState } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useZodForm } from "../../utils/form";
import { addQuestionSchema } from "../../utils/zodSchema";

const TalkSessionDetailPage: NextPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { talkSessionId } = router.query;
  const talkSessionQuery = api.talkSession.getAllQuestionInSession.useQuery(
    {
      talkSessionId: talkSessionId as string,
    },
    { refetchInterval: 30 * 1000 } // Thirty seconds
  );
  const talkSessionRouter = api.useContext().talkSession;
  const markAsAnsweredMutation =
    api.question.markQuestionAsAnswered.useMutation({
      async onSuccess() {
        await talkSessionRouter.getAllQuestionInSession.invalidate();
      },
      onError(error) {
        setError(error.message);
      },
    });
  const addQuestionMutation = api.question.addQuestion.useMutation({
    async onSuccess() {
      await talkSessionRouter.getAllQuestionInSession.invalidate();
    },
    onError(error) {
      setError(error.message);
    },
  });
  const talkSession = talkSessionQuery.data;

  const form = useZodForm({
    schema: addQuestionSchema,
    defaultValues: { question: "" },
    values: { question: "", talkSessionId: talkSessionId as string },
  });

  return (
    <>
      {error !== "" && <p className="text-red-500">{error}</p>}
      <main>
        <div>
          <span>{talkSession?.createdAt?.toLocaleDateString()}</span>
          <h2>{talkSession?.name}</h2>
        </div>
        <div>
          {talkSession?.question.map((question) => (
            <div key={question.id}>
              <span>{question.user.email}</span>
              <h3>{question.question}</h3>
              <span>{question.createdAt.toLocaleDateString()}</span>
              <button
                disabled={question.isAnswered}
                onClick={async () =>
                  await markAsAnsweredMutation.mutateAsync({
                    questionId: question.id,
                  })
                }
              >
                Answered
              </button>
            </div>
          ))}
        </div>
        <div>
          <form
            onSubmit={form.handleSubmit(
              async (values) => {
                await addQuestionMutation.mutateAsync(values);
                form.reset();
              },
              (error) => console.table(error)
            )}
            className="space-y-2"
          >
            <input type="hidden" {...form.register("talkSessionId")} />
            <div className="flex flex-row">
              <input
                {...form.register("question")}
                placeholder="Enter a question"
                className="border"
              />

              <button
                type="submit"
                disabled={addQuestionMutation.isLoading}
                className="bg-secondary-500 border p-2 font-bold"
              >
                {addQuestionMutation.isLoading ? "Loading" : "Submit"}
              </button>
            </div>

            {form.formState.errors.question?.message && (
              <p className="text-red-700">
                {form.formState.errors.question?.message}
              </p>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default TalkSessionDetailPage;
