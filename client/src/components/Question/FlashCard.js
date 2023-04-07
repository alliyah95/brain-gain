import { useState } from "react";

const FlashCard = ({ question, answer }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const flipHandler = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`question-card flip-card ${
                isFlipped ? "flip-card--flipped" : ""
            }`}
            onClick={flipHandler}
        >
            <div className="flip-card-front">{question}</div>
            <div className="flip-card-back">{answer.toString()}</div>
        </div>
    );
};

export default FlashCard;
