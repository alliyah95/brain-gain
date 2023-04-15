import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Card from "../../components/UI/Card";
import PaginationContainer from "../../components/Pagination/PaginationContainer";
import PaginationNav from "../../components/Pagination/PaginationNav";

const QuizzesTab = ({ quizSets }) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 959.99px)" });
    const isLargeScreen = useMediaQuery({
        query: "(min-width: 960px) and (max-width: 1139.99px)",
    });
    const isExtraLargeScreen = useMediaQuery({ query: "(min-width: 1140px)" });
    const [currentPage, setCurrentPage] = useState(1);
    const [numCards, setNumCards] = useState(6);
    const [firstCard, setFirstCard] = useState(0);

    useEffect(() => {
        if (isSmallScreen) {
            setNumCards(6);
        } else if (isLargeScreen) {
            setNumCards(12);
        } else if (isExtraLargeScreen) {
            setNumCards(15);
        }

        const newTotalPages = Math.ceil(quizSets.length / numCards);
        const newCurrentPage = Math.min(currentPage, newTotalPages);
        setCurrentPage(newCurrentPage);
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
                firstCardIndex={firstCard}
            />
        </div>
    );
};

export default QuizzesTab;
