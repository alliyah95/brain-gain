import { useState, useEffect, useCallback, useLocation } from "react";
import QuestionForm from "../../components/Quiz/QuestionForm";
import { Link, useRouteLoaderData, useParams } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { loadQuizDetail } from "../../util/quiz";
import Modal from "../../components/UI/Modal";
import ShareQuiz from "../../components/Quiz/ShareQuiz";

const QuizDetailPage = () => {
    const token = useRouteLoaderData("root");
    const [quizData, setQuizData] = useState(null);
    const [newQuestionAdded, setNewQuestionAdded] = useState(false);
    const [showAddQuestionBtn, setShowAddQuestionBtn] = useState(true);
    const [newQuestion, setNewQuestion] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const { displayId } = useParams();

    const fetchQuizData = useCallback(async () => {
        const quizData = await loadQuizDetail(displayId, token);
        setQuizData(quizData);
        setNewQuestionAdded(false);
    }, [displayId, token]);

    useEffect(() => {
        if (newQuestionAdded) {
            fetchQuizData();
        }
    }, [newQuestionAdded, fetchQuizData]);

    useEffect(() => {
        if (!quizData) {
            fetchQuizData();
        }
    }, [quizData, fetchQuizData]);

    const newQuestionHandler = () => {
        setNewQuestionAdded(true);
    };

    const questionFormVisibilityHandler = () => {
        setNewQuestion(!newQuestion);
        setShowAddQuestionBtn(!showAddQuestionBtn);
    };

    const shareModalVisibilityHandler = (visibility) => {
        setShowShareModal(visibility);
    };

    const modalContent = (
        <div className="space-y-4">
            <ShareQuiz
                link={`${window.location.href}/flashcards`}
                title="Flashcards"
                access="public"
            />
            <ShareQuiz
                link={`${window.location.href}/test`}
                title="Quiz"
                access="private"
            />
        </div>
    );

    return (
        <div>
            {showShareModal && (
                <Modal
                    message={modalContent}
                    noButtons={true}
                    onCancel={shareModalVisibilityHandler}
                />
            )}
            <div className="flex items-center gap-x-3">
                <h3 className="text-3xl lg:text-4xl font-bold text-brown flex break-all">
                    {quizData?.title}
                    <span className="mt-3 lg: ml-4 flex ">
                        {" "}
                        <Link to={`/quiz/${quizData?.displayId}/edit`}>
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
                <p className="text-yellow break-all">{quizData?.description}</p>
                {quizData?.questions.length === 0 && (
                    <p className="text-yellow break-all">
                        There are currently no questions in this quiz
                    </p>
                )}

                <div className="flex overflow-auto space-x-4 whitespace-nowrap pb-4">
                    {showAddQuestionBtn && (
                        <button
                            className="btn inline-flex items-center gap-x-2 "
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
                    <Link
                        className="btn inline-flex items-center gap-x-2"
                        to={`/quiz/${displayId}/test`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-stopwatch"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                            <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                        </svg>
                        Take quiz
                    </Link>

                    <button
                        className="btn inline-flex items-center gap-x-2"
                        onClick={() => {
                            setShowShareModal(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-share"
                            viewBox="0 0 16 16"
                        >
                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                        </svg>
                        Share
                    </button>
                    <Link
                        className="btn inline-flex items-center gap-x-2"
                        to={`/quiz/${displayId}/test`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-clock-history"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                        </svg>
                        View attempt history
                    </Link>
                </div>
            </div>
            {newQuestion && (
                <QuestionForm
                    method="POST"
                    onToggleForm={questionFormVisibilityHandler}
                    onAddQuestion={newQuestionHandler}
                    displayId={displayId}
                />
            )}
            {quizData?.questions && (
                <ul className="my-8 space-y-4">
                    {quizData?.questions.map((question) => {
                        return (
                            <li key={question._id}>
                                <Link
                                    to={`/quiz/${displayId}/question/${question._id}/edit`}
                                >
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

export const quizDetailLoader = async ({ request, params }) => {
    const token = getAuthToken();
    const quizDisplayId = params.displayId;
    const quizData = await loadQuizDetail(quizDisplayId, token);
    return quizData;
};
