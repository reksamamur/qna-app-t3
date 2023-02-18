import { Question } from "@prisma/client";
import { User } from "next-auth";

const QuestionCard = (props: {
  key?: React.Key;
  children?: JSX.Element;
  question: Question & {
    user: User;
  };
}) => (
  <div
    key={props.key}
    className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow"
  >
    <span className="text-gray-500">{props.question.user.email}</span>
    <h3 className="flex-grow text-lg">{props.question.question}</h3>
    <div className="flex items-end justify-between">
      <span>{props.question.createdAt?.toLocaleTimeString()}</span>
      {props.children}
    </div>
  </div>
);

export default QuestionCard;
