import { type NextPage } from "next";
import Link from "next/link";
import { api } from "../../utils/api";

const ParticipantPage: NextPage = () => {
  const questionsQuery = api.question.getAllByUserId.useQuery();

  return (
    <div>
      <nav>
        <Link href="/participant/join-talk-session">
          <button className="bg-primary">Join Talk Session</button>
        </Link>
      </nav>
      <main>
        {questionsQuery.data?.map((question) => (
          <div key={question.id}>
            <h3>{question.question}</h3>

            <Link href={`/talk-session/${question.talkSession.id}`}>
              {question.talkSession.name}
            </Link>

            <span>{question.createdAt.toLocaleDateString()}</span>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ParticipantPage;
