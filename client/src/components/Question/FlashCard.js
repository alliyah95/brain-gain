import { useState } from "react";

const Flashcard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipHandler = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`question-card flip-card ${
                isFlipped ? "flip-card--flipped" : ""
            } text-2xl lg:text-3xl my-5`}
            onClick={flipHandler}
        >
            <div className="flip-card-front">
                <p className="text-xs md:text-sm opacity-60 mb-2">Question</p>
                {question}
            </div>
            <div className="flip-card-back">
                {<p className="text-xs md:text-sm opacity-60 mb-2">Answer</p>}
                {answer.toString()}
            </div>
        </div>
    );
};

export default Flashcard;
