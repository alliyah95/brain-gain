import { useState, useEffect } from "react";
import Card from "../UI/Card";
import PaginationContainer from "../Pagination/PaginationContainer";
import PaginationNav from "../Pagination/PaginationNav";
import useMedia from "../../hooks/useMedia";
import { getNumCards } from "../../util/quiz";

const QuestionsList = ({ questions, displayId }) => {
    const { isSmallScreen, isLargeScreen, isExtraLargeScreen } = useMedia();
    const [currentPage, setCurrentPage] = useState(1);
    const [numCards, setNumCards] = useState(
        getNumCards(isSmallScreen, isLargeScreen, isExtraLargeScreen, true)
    );
    useEffect(() => {
        setNumCards(
            getNumCards(isSmallScreen, isLargeScreen, isExtraLargeScreen, true)
        );
    }, [isSmallScreen, isLargeScreen, isExtraLargeScreen]);

    if (questions.length === 0) {
        return (
            <p className="text-yellow mt-2">
                There are currently no questions in this quiz
            </p>
        );
    }

    const cards = questions.map((question, index) => {
        return (
            <Card
                path={`/quiz/${displayId}/question/${question._id}/edit`}
                title={question.description}
                hasTag={true}
                tagType="no-bg"
                noDescPrompt={true}
                tagContent={`Question ${index + 1}`}
            />
        );
    });

    const lastCardIndex = currentPage * numCards;
    const firstCardIndex = lastCardIndex - numCards;
    const currentCards = cards.slice(firstCardIndex, lastCardIndex);

    return (
        <div className="my-8">
            <PaginationContainer
                cards={currentCards}
                smHeight="800px"
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
    );
};

export default QuestionsList;
