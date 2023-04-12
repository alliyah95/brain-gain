import { useState } from "react";
import {
    useLoaderData,
    Link,
    json,
    useRouteLoaderData,
} from "react-router-dom";
import FlashCard from "../../components/Question/FlashCard";
import { getAuthToken } from "../../util/auth";
import { loadQuizDetail } from "../../util/quiz";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const FlashCardsPage = () => {
    const quizData = useLoaderData();
    const [index, setIndex] = useState(0);
    const token = useRouteLoaderData("root");

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
                            <ChevronLeftIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                        </button>

                        <button className="btn" onClick={nextBtnHandler}>
                            <ChevronRightIcon className="h-4 w-4 lg:h-6 lg:w-6" />
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
