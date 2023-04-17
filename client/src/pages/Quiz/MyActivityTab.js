import { useState, useEffect } from "react";
import Card from "../../components/UI/Card";
import PaginationContainer from "../../components/Pagination/PaginationContainer";
import PaginationNav from "../../components/Pagination/PaginationNav";
import useMedia from "../../hooks/useMedia";
import { getNumCards } from "../../util/quiz";

const MyActivityTab = ({ attemptHistory, currentUser }) => {
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

    if (attemptHistory.length === 0) {
        return <p className="italic">You have not taken any quiz sets yet.</p>;
    }

    const cards = attemptHistory.map((attempt) => {
        return (
            <Card
                path={`/quiz/result/${attempt.id}`}
                title={attempt.quizTitle}
                description={`Score: ${attempt.score}/${attempt.totalScore}`}
                hasTag={true}
                tagContent={
                    currentUser !== attempt.quizSetCreator
                        ? "others"
                        : "own quiz"
                }
            />
        );
    });

    const lastCardIndex = currentPage * numCards;
    const firstCardIndex = lastCardIndex - numCards;
    const currentCards = cards.slice(firstCardIndex, lastCardIndex);

    return (
        <div>
            <PaginationContainer cards={currentCards} />
            <PaginationNav
                totalCards={cards.length}
                cardsPerPage={numCards}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default MyActivityTab;
