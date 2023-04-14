import { getAuthToken } from "../../util/auth";
import { json, useLoaderData, Link } from "react-router-dom";
import { formatDateTime } from "../../util/quiz";
import Card from "../../components/UI/Card";

const AttemptHistoryPage = () => {
    const { attemptHistory, quizName, quizDisplayId } = useLoaderData();

    return (
        <div className="md:px-5 xl:px-8">
            <div className="mb-2">
                <p className="tag bg-brown mb-2">Attempt history</p>
                <Link to={`/quiz/${quizDisplayId}`}>
                    {" "}
                    <h3 className="text-3xl lg:text-4xl font-bold text-brown flex break-all">
                        {quizName}
                    </h3>
                </Link>

                <p className="text-yellow italic mt-2">
                    {attemptHistory.length === 0
                        ? "You have not taken this quiz yet"
                        : "You can only view your own attempts and the attempts made by unregistered users when the results link has been shared with you"}
                </p>
            </div>

            {attemptHistory && (
                <ul className="my-8 preview-card-container">
                    {attemptHistory.map((attempt) => {
                        return (
                            <li key={attempt.id}>
                                <Card
                                    path={`/quiz/result/${attempt.id}`}
                                    title={`Attempt made on ${formatDateTime(
                                        attempt.attemptDate
                                    )}`}
                                    description={`Score: ${attempt.score}/${attempt.totalScore}`}
                                    hasTag={false}
                                    noDescPrompt={true}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
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

    if (response.status === 404 || response.status === 401) {
        throw response;
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
