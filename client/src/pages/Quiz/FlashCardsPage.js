import { useState } from "react";
import {
    useLoaderData,
    Link,
    useParams,
    json,
    useRouteLoaderData,
} from "react-router-dom";
import FlashCard from "../../components/Question/FlashCard";
import { getAuthToken } from "../../util/auth";
import { loadQuizDetail } from "../../util/quiz";

const FlashCardsPage = () => {
    const quizData = useLoaderData();
    const [index, setIndex] = useState(0);
    const token = useRouteLoaderData("root");
    const { displayId } = useParams();

    const prevBtnHandler = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const nextBtnHandler = () => {
        if (index < quizData.questions.length - 1) {
            setIndex(index + 1);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            <p className="text-center font-bold text-2xl">{quizData.title}</p>
            <p className="text-center text-yellow ">
                {quizData.questions.length === 0 ? "0" : index + 1}/
                {quizData.questions.length} questions
            </p>

            {quizData.questions.length > 0 && (
                <>
                    <FlashCard
                        key={index}
                        question={quizData.questions[index].description}
                        answer={quizData.questions[index].answer}
                    />
                    <div className="space-x-8 mx-auto text-center">
                        <button className="btn" onClick={prevBtnHandler}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                />
                            </svg>
                        </button>

                        <button className="btn" onClick={nextBtnHandler}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chevron-right"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            {quizData.questions.length === 0 && (
                <div className="text-center my-20 px-4">
                    <p className="text-2xl lg:text-3xl font-bold mb-5">
                        Oops! This quiz does not have any questions yet
                    </p>
                    {token && (
                        <Link className="btn" to={`/quizzes`}>
                            View my quizzes
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default FlashCardsPage;

export const publicQuizDetailLoader = async ({ params }) => {
    const quizDisplayId = params.displayId;
    const quizData = await loadQuizDetail(quizDisplayId, null);
    const token = getAuthToken();

    if (!quizData.isPublic && !token) {
        throw json(
            {
                message: "You are unauthorized to access this quiz.",
            },
            { status: 401 }
        );
    }

    return quizData;
};
