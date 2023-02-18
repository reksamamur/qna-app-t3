import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "src/components/layout";

import type { NextPageWithLayout } from "../_app";

import { api } from "@utils/api";
import QuestionGrid from "src/components/question-grid";
import QuestionInput from "src/components/question-input";
import { QrCodeIcon } from "@heroicons/react/24/outline";

const TalkSessionDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { talkSessionId } = router.query;
  const talkSessionQuery = api.talkSession.getAllQuestionInSession.useQuery(
    {
      talkSessionId: talkSessionId as string,
    },
    {
      enabled: typeof talkSessionId !== "undefined",
      refetchInterval: 30 * 1000, // Thirty seconds
    }
  );
  const talkSession = talkSessionQuery.data;

  return (
    <>
      <Head>
        <title>
          QnA App - Talk Session {talkSession && `- ${talkSession.name}`}
        </title>
      </Head>

      <div className="mx-auto flex max-h-full w-full max-w-7xl flex-col gap-2 p-6 sm:gap-6 lg:p-8">
        <div className="flex flex-row justify-end">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded bg-[#461091] px-3 py-2 text-center text-sm  font-semibold text-white hover:bg-[#2e026d] focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Share
            <QrCodeIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="grid max-w-full items-center gap-4 rounded border-2 border-indigo-800 p-4">
          <h3 className="text-xl">Talk Session - {talkSession?.name}</h3>
          <span>{talkSession?.createdAt?.toLocaleDateString()}</span>
        </div>
        <div className="grid flex-grow gap-4">
          <h2 className="text-lg">New Questions</h2>
          <QuestionGrid questions={talkSession?.question} isAnswered={false} />
          <h2 className="text-lg">Answered Questions</h2>
          <QuestionGrid questions={talkSession?.question} isAnswered={true} />
        </div>
        <div>
          <QuestionInput talkSessionId={talkSessionId as string} />
        </div>
      </div>
    </>
  );
};

TalkSessionDetailPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default TalkSessionDetailPage;
