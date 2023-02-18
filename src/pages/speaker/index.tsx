import Link from "next/link";
import { useSession } from "next-auth/react";

import { api } from "../../utils/api";

import Layout from "../../components/layout";

import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import { PlusIcon } from "@heroicons/react/24/outline";

const SpeakerPage: NextPageWithLayout = () => {
  const { status } = useSession();

  const talkSessions = api.talkSession.getAllByUserId.useQuery(undefined, {
    enabled: status === "authenticated",
  });

  return (
    <>
      <Head>
        <title>QnA App - Speaker</title>
      </Head>

      <div className="mx-auto min-h-full w-full max-w-7xl p-2 sm:p-6 lg:p-8">
        <div className="my-4 flex justify-center md:my-2 md:justify-end">
          <Link href="/speaker/new-talk-session">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded bg-[#461091] p-2 align-middle text-sm font-semibold text-white hover:bg-[#2e026d]"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
              Create Talk Session
            </button>
          </Link>
        </div>
        <section className="grid gap-4">
          <h2 className="text-xl font-semibold">Talk Session</h2>
          {talkSessions.data?.map((talkSession) => (
            <Link
              key={talkSession.id}
              href={`/talk-session/${talkSession.id}`}
              className="grid max-w-full items-center gap-4 rounded border-2 border-indigo-800 p-4 hover:bg-indigo-800 hover:text-white"
            >
              <h3 className="text-xl">{talkSession.name}</h3>
              <span>{talkSession.createdAt.toLocaleString()}</span>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
};

SpeakerPage.getLayout = (page) => {
  return <Layout route="Speaker">{page}</Layout>;
};

export default SpeakerPage;
