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
            <>
                <input
                    type="text"
                    className="line-input  text-center text-md w-4/5 max-w-md"
                    placeholder={
                        props.remark === "unanswered"
                            ? ""
                            : "Your answer here..."
                    }
                    name={props.name}
                    disabled={props.disabled}
                    defaultValue={props.userAnswer}
                />
                <p className="text-sm">
                    The correct answer is {props.data.answer}.
                </p>
                {props.data.options.length > 0 && (
                    <p className="text-sm">
                        Other possible answers are:{" "}
                        {props.data.options.join(", ")}.
                    </p>
                )}
            </>
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
                        defaultChecked={props.userAnswer === option}
                        disabled={props.disabled}
                    />
                    <label>{option}</label>
                </div>
            );
        });
    }

    const REMARKS = {
        correct: "You got it right!",
        incorrect: "Oops! Incorrect.",
        unanswered: "You did not answer this question.",
    };

    return (
        <div className="question-card text-xl xl:text-2xl min-h-[50vh]">
            <p className="text-xs md:text-sm opacity-60 mb-2">
                Question {props.index + 1}
            </p>

            <p className="mb-2">{props.data.description}</p>
            {props.type === "viewing" && (
                <p className="text-xs md:text-sm italic text-yellow mb-2">
                    {REMARKS[props.remark]}
                </p>
            )}
            {cardContent}
        </div>
    );
};

export default QuestionCard;
