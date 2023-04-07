import React from "react";

const QuestionCard = (props) => {
    let cardContent = null;

    const shuffleOptions = (options) => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    };

    if (props.data.type === "identification") {
        cardContent = (
            <input
                type="text"
                className="line-input  text-center text-md w-4/5 max-w-md"
                placeholder="Your answer here..."
                name={props.name}
            />
        );
    } else {
        let finalOptions = [];

        if (props.data.type === "multiple choice") {
            const choices = props.data.options;
            finalOptions = shuffleOptions([...choices, props.data.answer]);
        } else if (props.data.type === "true or false") {
            finalOptions = props.data.options;
        }

        cardContent = finalOptions.map((option, index) => {
            return (
                <div className="flex items-center space-x-1" key={index}>
                    <input
                        type="radio"
                        className="radio-btn"
                        value={option}
                        name={props.name}
                    />
                    <label>{option}</label>
                </div>
            );
        });
    }

    return (
        <div className="question-card text-xl xl:text-2xl min-h-[50vh]">
            <p className="mb-2">{props.data.description}</p>
            {cardContent}
        </div>
    );
};

export default QuestionCard;
