import { useState, useEffect, useCallback } from "react";
import QuestionForm from "../../components/Question/QuestionForm";
import {
    Link,
    useParams,
    useLoaderData,
    useRouteLoaderData,
} from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { loadQuizDetail } from "../../util/quiz";
import Modal from "../../components/UI/Modal";
import ShareQuiz from "../../components/Quiz/ShareQuiz";
import {
    ClockIcon,
    ListBulletIcon,
    PencilSquareIcon,
    PlusIcon,
    ShareIcon,
} from "@heroicons/react/24/solid";
import QuestionsList from "../../components/Question/QuestionsList";
import Spinner from "../../components/UI/Spinner";

const QuizDetailPage = () => {
    const data = useLoaderData();
    const [quizData, setQuizData] = useState(data);
    const token = useRouteLoaderData("root");
    const [newQuestionAdded, setNewQuestionAdded] = useState(false);
    const [showAddQuestionBtn, setShowAddQuestionBtn] = useState(true);
    const [isAddingQuestion, setIsAddingQuestion] = useState(false);
    const [newQuestion, setNewQuestion] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const { displayId } = useParams();

    const fetchQuizData = useCallback(async () => {
        setIsAddingQuestion(true);
        const quizData = await loadQuizDetail(displayId, token);
        setQuizData(quizData);
        setNewQuestionAdded(false);
        setIsAddingQuestion(false);
    }, [displayId, token]);

    useEffect(() => {
        if (newQuestionAdded) {
            fetchQuizData();
        }
    }, [newQuestionAdded, fetchQuizData]);

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
            />
            <ShareQuiz link={`${window.location.href}/test`} title="Test" />
        </div>
    );

    return (
        <>
            {isAddingQuestion && <Spinner />}
            <div className="md:px-5 xl:px-8">
                {showShareModal && (
                    <Modal
                        message={modalContent}
                        noButtons={true}
                        onCancel={shareModalVisibilityHandler}
                        addtlMsg={
                            quizData.isPublic
                                ? "Anyone can access the quiz through the links."
                                : "Only you and registered users can access the quiz."
                        }
                    />
                )}
                <div className="flex items-center gap-x-3">
                    <h3 className="text-3xl lg:text-4xl font-bold text-brown flex">
                        {quizData?.title}
                        <span className="mt-3 lg: ml-4 flex ">
                            {" "}
                            <Link to={`/quiz/${quizData?.displayId}/edit`}>
                                <PencilSquareIcon className="h-6 w-6" />
                            </Link>
                        </span>
                    </h3>
                </div>

                <div className="space-y-4 my-2">
                    <p className="text-yellow">{quizData?.description}</p>
                    <div className="flex overflow-auto space-x-4 whitespace-nowrap pb-4">
                        {showAddQuestionBtn && (
                            <button
                                className="btn inline-flex items-center gap-x-2 "
                                onClick={questionFormVisibilityHandler}
                            >
                                <PlusIcon className="h-3.5 w-3.5 text-light-brown fill-none stroke-current stroke-2" />
                                Add a question
                            </button>
                        )}
                        <Link
                            className="btn inline-flex items-center gap-x-2"
                            to={`/quiz/${displayId}/flashcards`}
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
                        <Link
                            className="btn inline-flex items-center gap-x-2"
                            to={`/quiz/${displayId}/test`}
                        >
                            <ClockIcon className="h-3.5 w-3.5 text-light-brown fill-none stroke-current stroke-2" />
                            Take quiz
                        </Link>

                        <button
                            className="btn inline-flex items-center gap-x-2"
                            onClick={() => {
                                setShowShareModal(true);
                            }}
                        >
                            <ShareIcon className="h-3.5 w-3.5 text-light-brown fill-none stroke-current stroke-2" />
                            Share
                        </button>
                        <Link
                            className="btn inline-flex items-center gap-x-2"
                            to={`/quiz/${displayId}/attempt_history`}
                        >
                            <ListBulletIcon className="h-4 w-4 text-light-brown stroke-current" />
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
                        renderQuestions={newQuestionHandler}
                    />
                )}

                <QuestionsList
                    questions={quizData.questions}
                    displayId={displayId}
                />
            </div>
        </>
    );
};

export default QuizDetailPage;

export const quizDetailLoader = async ({ request, params }) => {
    const token = getAuthToken();
    const quizDisplayId = params.displayId;
    const quizData = await loadQuizDetail(quizDisplayId, token);
    return quizData;
};
