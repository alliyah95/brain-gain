import { Link, json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const QuizzesPage = () => {
    const quizSets = useLoaderData();

    return (
        <div className="md:px-5 xl:px-8">
            <ul className="flex flex-row gap-4 border-b-[1px] border-b-brown py-2 mb-4 font-bold">
                <li>
                    <Link>Quiz Sets</Link>
                </li>
                <li className="opacity-50">
                    <Link>My Activity</Link>
                </li>
                <li className="opacity-50">
                    <Link>Friends' Activity</Link>
                </li>
            </ul>

            {quizSets.length === 0 && (
                <p className="italic">You don't have any quiz sets yet.</p>
            )}
            {quizSets && (
                <ul className="preview-card-container">
                    {quizSets.map((quiz) => {
                        return (
                            <li key={quiz.id}>
                                <Link to={`/quiz/${quiz.displayId}`}>
                                    <div className="preview-card">
                                        <p className="tag bg-yellow">
                                            {quiz.numQuestions} questions
                                        </p>
                                        <p className="font-semibold">
                                            {quiz.title}
                                        </p>
                                        {quiz.description && (
                                            <p>{quiz.description}</p>
                                        )}
                                        {!quiz.description && (
                                            <p className="text-brown text-opacity-50">
                                                No description
                                            </p>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default QuizzesPage;

export const quizzesLoader = async () => {
    const token = getAuthToken();
    const response = await fetch("http://localhost:8080/api/quiz_sets", {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    if (!response.ok) {
        throw json(
            { message: "Could not fetch your quiz sets" },
            { status: 500 }
        );
    }

    const data = await response.json();
    return data.filteredQuizSets;
};
