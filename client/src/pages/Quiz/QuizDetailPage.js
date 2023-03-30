import { useState } from "react";
import NewQuestionForm from "../../components/Quiz/NewQuestionForm";
import { Link, json, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const QuizDetailPage = () => {
    const quizData = useLoaderData();
    const [showAddQuestionBtn, setShowAddQuestionBtn] = useState(true);
    const [newQuestion, setNewQuestion] = useState(false);

    const questionFormVisibilityHandler = () => {
        setNewQuestion(!newQuestion);
        setShowAddQuestionBtn(!showAddQuestionBtn);
    };

    return (
        <div>
            <div className="flex items-center gap-x-3">
                <h3 className="text-3xl lg:text-4xl font-bold text-brown flex break-all">
                    {quizData.title}
                    <span className="mt-3 lg: ml-4 flex ">
                        {" "}
                        <Link to={`/quiz/${quizData.displayId}/edit`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-pencil-square w-5 text-brown"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                    fillRule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                            </svg>
                        </Link>
                    </span>
                </h3>
            </div>

            <div className="space-y-4 mt-2">
                <p className="text-yellow break-all">{quizData.description}</p>
                {quizData.questions.length === 0 && (
                    <p className="text-yellow break-all">
                        There are currently no questions in this quiz
                    </p>
                )}

                {showAddQuestionBtn && (
                    <button
                        className="btn inline-flex items-center gap-x-2"
                        onClick={questionFormVisibilityHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus text-white"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Add a question
                    </button>
                )}
            </div>
            {newQuestion && (
                <NewQuestionForm onToggleForm={questionFormVisibilityHandler} />
            )}
            {quizData.questions && (
                <ul className="my-8 space-y-4">
                    {quizData.questions.map((question) => {
                        return (
                            <li key={question._id}>
                                <Link>
                                    <div className="preview-card-light">
                                        <p className="font-semibold">
                                            {question.description}
                                        </p>
                                        <p className="text-muted-brown">
                                            Correct answer:{" "}
                                            {question.answer.toString()}
                                        </p>
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

export default QuizDetailPage;

export const loader = async ({ request, params }) => {
    const token = getAuthToken();
    const quizDisplayId = params.displayId;

    const response = await fetch(
        "http://localhost:8080/api/quiz/" + quizDisplayId,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (!response.ok) {
        throw json({ message: "Could not fetch quiz set" }, { status: 500 });
    }

    const data = await response.json();
    return data.quiz;
};
