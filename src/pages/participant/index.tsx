import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import type { NextPageWithLayout } from "../_app";

import Layout from "src/components/layout";
import QuestionCard from "src/components/question-card";
import JoinModal from "src/components/join-modal";

import { api } from "@utils/api";
import { classNames } from "@utils/utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const ParticipantPage: NextPageWithLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const questionsQuery = api.question.getAllByUserId.useQuery();

  return (
    <>
      <Head>
        <title>QnA App - Participant</title>
      </Head>

      <JoinModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />

      <div className="mx-auto flex max-h-full w-full max-w-7xl flex-col gap-2 p-6 sm:gap-6 lg:p-8">
        <div className="flex flex-row justify-end">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded bg-[#461091] px-3 py-2 text-center text-sm  font-semibold text-white hover:bg-[#2e026d] focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Join Talk Session
          </button>
        </div>
        <h2 className="text-xl font-semibold">Previous Questions</h2>
        <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6">
          {questionsQuery.data?.map((question) => (
            <QuestionCard key={question.id} question={question}>
              <span
                className={classNames(
                  question.isAnswered ? "text-gray-500" : "",
                  "text-sm"
                )}
              >
                {question.isAnswered ? "Answered" : "Not Answered"}
              </span>
              <Link
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                href={`/talk-session/${question.talkSession.id}`}
              >
                Talk Session: {question.talkSession.name}
                <ArrowTopRightOnSquareIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </Link>
            </QuestionCard>
          ))}
        </section>
      </div>
    </>
  );
};

ParticipantPage.getLayout = (page) => {
  return <Layout route="Participant">{page}</Layout>;
};

export default ParticipantPage;
