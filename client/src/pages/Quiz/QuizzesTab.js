import { useState, useEffect } from "react";
import useMedia from "../../hooks/useMedia";
import { getNumCards } from "../../util/quiz";
import Card from "../../components/UI/Card";
import PaginationContainer from "../../components/Pagination/PaginationContainer";
import PaginationNav from "../../components/Pagination/PaginationNav";

const QuizzesTab = ({ quizSets }) => {
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

    if (quizSets.length === 0) {
        return <p className="italic">You don't have any quiz sets yet.</p>;
    }

    const cards = quizSets?.map((quiz) => {
        return (
            <Card
                path={`/quiz/${quiz.displayId}`}
                title={quiz.title}
                description={quiz.description}
                hasTag={true}
                tagContent={`${quiz.numQuestions} questions`}
                noDescPrompt={false}
            />
        );
    });

    const lastCardIndex = currentPage * numCards;
    const firstCardIndex = lastCardIndex - numCards;
    const currentCards = cards.slice(firstCardIndex, lastCardIndex);

    return (
        <div>
            <PaginationContainer cards={currentCards} smHeight="850px" />
            <PaginationNav
                totalCards={cards.length}
                cardsPerPage={numCards}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
};

export default QuizzesTab;
