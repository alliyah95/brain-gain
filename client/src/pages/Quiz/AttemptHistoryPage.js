import { getAuthToken } from "../../util/auth";
import { json, useLoaderData, Link } from "react-router-dom";

const AttemptHistoryPage = () => {
    const { attemptHistory, quizName, quizDisplayId } = useLoaderData();

    return (
        <>
            <div className="mb-2">
                <h3 className="text-3xl lg:text-4xl font-bold text-brown flex break-all">
                    {quizName}
                </h3>
                <p className="text-yellow">Attempt history</p>
            </div>

            <ul className="my-8 space-y-4">
                {attemptHistory.map((attempt) => {
                    return (
                        <li key={attempt._id}>
                            <Link
                                to={`/quiz/${quizDisplayId}/result/${attempt.id}`}
                            >
                                <div className="preview-card-light">
                                    <p className="font-semibold">
                                        Attempt made by {attempt.user}
                                    </p>
                                    <p className="text-muted-brown">
                                        Score: {attempt.score}/
                                        {attempt.totalScore}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default AttemptHistoryPage;

export const attemptHistoryLoader = async ({ request, params }) => {
    const token = getAuthToken();
    const quizDisplayId = params.displayId;

    const response = await fetch(
        `http://localhost:8080/api/get_attempt_history/${quizDisplayId}`,
        {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 404) {
        throw json({ message: "Quiz not found" });
    }

    if (response.status === 401) {
        throw json({ message: "You are unauthorized to access this." });
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

    const data = await response.json();
    return {
        attemptHistory: data.attemptHistory,
        quizName: data.quizName,
        quizDisplayId: data.quizDisplayId,
    };
};
