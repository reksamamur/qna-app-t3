import Link from "next/link";

import { api } from "../../utils/api";

import Layout from "../../components/layout";

import { NextPageWithLayout } from "../_app";

const SpeakerPage: NextPageWithLayout = () => {
  const talkSessions = api.talkSession.getAllByUserId.useQuery();

  return (
    <div>
      <nav>
        <Link href="/speaker/new-talk-session">
          <button className="bg-primary">Create Talk Session</button>
        </Link>
      </nav>
      <main>
        {talkSessions.data?.map((talkSession) => (
          <div key={talkSession.id}>
            <Link href={`/talk-session/${talkSession.id}`}>
              {talkSession.name}
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
};

SpeakerPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default SpeakerPage;
