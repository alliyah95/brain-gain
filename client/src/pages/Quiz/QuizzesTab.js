import { useState } from "react";
import Card from "../../components/UI/Card";
import PaginationContainer from "../../components/Pagination/PaginationContainer";
import PaginationNav from "../../components/Pagination/PaginationNav";

const QuizzesTab = ({ quizSets }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [numCards, setNumCards] = useState(15);

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
            <div className="min-h-[85vh] lg:min-h-[70vh]">
                <PaginationContainer cards={currentCards} />
            </div>

            <PaginationNav
                totalCards={cards.length}
                cardsPerPage={numCards}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default QuizzesTab;
