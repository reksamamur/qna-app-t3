import { Question } from "@prisma/client";

const QuestionCard = (props: {
  key?: React.Key;
  children?: JSX.Element[];
  question: Question;
}) => {
  const hasChildren = props.children?.length ?? 0 > 1;

  return (
    <div
      key={props.key}
      className="flex w-full flex-col gap-2 rounded-lg border border-gray-200 bg-white p-6 shadow"
    >
      {hasChildren && props.children?.at(0)}
      <h3 className="flex-grow text-lg">{props.question.question}</h3>
      <div className="flex items-end justify-between">
        <span>{props.question.createdAt?.toLocaleTimeString()}</span>
        {hasChildren ? props.children?.at(1) : props.children?.at(0)}
      </div>
    </div>
  );
};

export default QuestionCard;
