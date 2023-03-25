import { Link, json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const QuizzesPage = () => {
    const quizSets = useLoaderData();

    return (
        <div className="md:bg-light-brown md:p-5 md:rounded-md xl:p-8">
            <ul className="flex flex-row gap-4 border-b-[1px] border-b-brown py-2 mb-4 lg:text-lg font-semibold">
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

            <ul className="space-y-3">
                {quizSets.length === 0 && (
                    <p className="italic">You don't have any quiz sets yet.</p>
                )}
                {quizSets &&
                    quizSets.map((quiz) => {
                        return (
                            <li key={quiz.id}>
                                <Link to={`/quiz/${quiz.displayId}`}>
                                    <div className="preview-card">
                                        <div className="space-x-2">
                                            <span className="font-semibold text-light-brown">
                                                {quiz.title}
                                            </span>
                                            <span className="text-yellow">
                                                {quiz.numQuestions} questions
                                            </span>
                                        </div>
                                        <p className="text-light-brown">
                                            {quiz.description}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default QuizzesPage;

export const loader = async () => {
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