import { useLoaderData, json } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import QuestionCard from "../../components/Question/QuestionCard";

const QuizResultsPage = () => {
    const details = useLoaderData();
    const attemptDate = new Date(details.createdAt);

    const month = attemptDate.toLocaleString("default", { month: "long" });
    const time = attemptDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    const formattedDatetime = `${month} ${attemptDate.getDate()}, ${attemptDate.getFullYear()} at ${time}`;

    const questions = details.details;

    return (
        <div className="max-w-[1200px] mx-auto text-center">
            <p className="font-bold text-2xl">{details.quizSet.title}</p>
            <p className="text-yellow mb-8">
                Attempt made on {formattedDatetime}
            </p>

            <p className="font-semibold text-xl  bg-yellow text-white inline mx-auto p-4">
                Your score: {details.score} / {questions.length}
            </p>

            <p className="italic mt-12">
                Your answer may not be displayed if you have not answered the
                question or if it has been edited.
            </p>
            <ul className="mt-8 space-y-5 md:space-y-8">
                {questions &&
                    questions.map((question, index) => {
                        return (
                            <li key={question._id}>
                                <QuestionCard
                                    key={question._id}
                                    data={question.questionDetails}
                                    name={`question${index}`}
                                    disabled={true}
                                    remark={question.remark}
                                    userAnswer={question.userAnswer}
                                    type="viewing"
                                    index={index}
                                />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default QuizResultsPage;

export const resultsLoader = async ({ params }) => {
    const attemptId = params.attemptId;
    const displayId = params.displayId;
    const token = getAuthToken();

    const response = await fetch(
        `http://localhost:8080/api/get_attempt_details/${displayId}/${attemptId}`,
        {
            method: "GET",
            headers: { Authorization: "Bearer " + token },
        }
    );

    if (response.status === 404) {
        throw json({ message: "Attempt not found" });
    }

    if (!response.ok) {
        throw json(
            {
                message:
                    "There has been an internal server error. We'll try to fix it ASAP...",
            },
            { status: 500 }
        );
    }

    const results = await response.json();
    return results.attempt;
};
