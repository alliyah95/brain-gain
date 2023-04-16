import { useState, useEffect } from "react";
import Card from "../../components/UI/Card";
import PaginationContainer from "../../components/Pagination/PaginationContainer";
import PaginationNav from "../../components/Pagination/PaginationNav";
import useMedia from "../../hooks/useMedia";

const QuizzesTab = ({ quizSets }) => {
    const { isSmallScreen, isLargeScreen, isExtraLargeScreen } = useMedia();
    const [currentPage, setCurrentPage] = useState(1);
    const [numCards, setNumCards] = useState(6);

    useEffect(() => {
        if (isSmallScreen) {
            setNumCards(6);
        } else if (isLargeScreen) {
            setNumCards(12);
        } else if (isExtraLargeScreen) {
            setNumCards(15);
        }
    }, [
        isSmallScreen,
        isLargeScreen,
        isExtraLargeScreen,
        quizSets.length,
        numCards,
        currentPage,
    ]);

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
        <div className="overflow-hidden">
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

export default QuizzesTab;
