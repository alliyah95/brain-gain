import { ClockIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const QuizTitleAndDescription = ({
    title,
    description,
    creatorUsername,
    type,
    displayId,
    numQuestions,
}) => {
    return (
        <div className="text-center">
            <p className="font-bold text-2xl">{title}</p>
            <p>{description}</p>
            <p className="text-yellow my-2">
                created by <span className="font-bold">{creatorUsername}</span>
            </p>
            {numQuestions > 0 && type === "flashcards" && (
                <Link
                    className="btn inline-flex items-center gap-x-2 mx-auto"
                    to={`/quiz/${displayId}/test`}
                    target="_blank"
                >
                    <ClockIcon className="h-3.5 w-3.5 text-light-brown fill-none stroke-current stroke-2" />
                    Take quiz
                </Link>
            )}
            {numQuestions > 0 && type === "test" && (
                <Link
                    className="btn inline-flex items-center gap-x-2"
                    to={`/quiz/${displayId}/flashcards`}
                    target="_blank"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-card-text h-3.5 w-3.5"
                        viewBox="0 0 16 16"
                    >
                        <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                        <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    View flashcards
                </Link>
            )}
        </div>
    );
};

export default QuizTitleAndDescription;
