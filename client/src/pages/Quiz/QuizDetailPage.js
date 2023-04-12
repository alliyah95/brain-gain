import { useState, useEffect, useCallback } from "react";
import QuestionForm from "../../components/Quiz/QuestionForm";
import { Link, useRouteLoaderData, useParams } from "react-router-dom";
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
            />
            <ShareQuiz link={`${window.location.href}/test`} title="Quiz" />
        </div>
    );

    return (
        <div>
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
                <h3 className="text-3xl lg:text-4xl font-bold text-brown flex break-all">
                    {quizData?.title}
                    <span className="mt-3 lg: ml-4 flex ">
                        {" "}
                        <Link to={`/quiz/${quizData?.displayId}/edit`}>
                            <PencilSquareIcon className="h-6 w-6" />
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
                            <PlusIcon className="h-4 w-4 text-light-brown fill-none stroke-current stroke-2" />
                            Add a question
                        </button>
                    )}
                    <Link
                        className="btn inline-flex items-center gap-x-2"
                        to={`/quiz/${displayId}/test`}
                    >
                        <ClockIcon className="h-4 w-4 text-light-brown fill-none stroke-current stroke-2" />
                        Take quiz
                    </Link>

                    <button
                        className="btn inline-flex items-center gap-x-2"
                        onClick={() => {
                            setShowShareModal(true);
                        }}
                    >
                        <ShareIcon className="h-4 w-4 text-light-brown fill-none stroke-current stroke-2" />
                        Share
                    </button>
                    <Link
                        className="btn inline-flex items-center gap-x-2"
                        to={`/quiz/${displayId}/attempt_history`}
                    >
                        <ListBulletIcon className="h-5 w-5 text-light-brown stroke-current" />
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
                    {quizData?.questions.map((question, index) => {
                        return (
                            <li key={question._id}>
                                <Link
                                    to={`/quiz/${displayId}/question/${question._id}/edit`}
                                >
                                    <div className="preview-card-light">
                                        <p className="text-muted-brown text-xs">
                                            Question {index + 1}
                                        </p>
                                        <p className="font-semibold">
                                            {question.description}
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
