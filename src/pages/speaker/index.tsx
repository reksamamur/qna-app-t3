import { type NextPage } from "next";
import Link from "next/link";

import { api } from "../../utils/api";

const SpeakerPage: NextPage = () => {
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

export default SpeakerPage;
