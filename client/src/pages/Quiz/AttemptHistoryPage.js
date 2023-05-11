import { useState, useEffect } from "react";
import { getAuthToken } from "../../util/auth";
import { json, useLoaderData, Link } from "react-router-dom";
import { formatDateTime } from "../../util/quiz";
import { getNumCards } from "../../util/quiz";
import Card from "../../components/UI/Card";
import useMedia from "../../hooks/useMedia";
import PaginationContainer from "../../components/Pagination/PaginationContainer";
import PaginationNav from "../../components/Pagination/PaginationNav";

const AttemptHistoryPage = () => {
    const { attemptHistory, quizName, quizDisplayId } = useLoaderData();
    const { isSmallScreen, isLargeScreen, isExtraLargeScreen } = useMedia();
    const [currentPage, setCurrentPage] = useState(1);
    const [numCards, setNumCards] = useState(
        getNumCards(isSmallScreen, isLargeScreen, isExtraLargeScreen, false)
    );
    useEffect(() => {
        setNumCards(
            getNumCards(isSmallScreen, isLargeScreen, isExtraLargeScreen, false)
        );
    }, [isSmallScreen, isLargeScreen, isExtraLargeScreen]);

    const cards = attemptHistory.map((attempt) => {
        return (
            <Card
                path={`/result/${attempt.id}`}
                title={`Attempt made on ${formatDateTime(attempt.attemptDate)}`}
                description={`Score: ${attempt.score}/${attempt.totalScore}`}
                hasTag={false}
                noDescPrompt={true}
            />
        );
    });

    const lastCardIndex = currentPage * numCards;
    const firstCardIndex = lastCardIndex - numCards;
    const currentCards = cards.slice(firstCardIndex, lastCardIndex);

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

            <div>
                <PaginationContainer
                    cards={currentCards}
                    smHeight="900px"
                    lgHeight="900px"
                    xlHeight="665px"
                />
                <PaginationNav
                    totalCards={cards.length}
                    cardsPerPage={numCards}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default AttemptHistoryPage;

export const attemptHistoryLoader = async ({ params }) => {
    const token = getAuthToken();
    const quizDisplayId = params.displayId;

    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}get_attempt_history/${quizDisplayId}`,
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
