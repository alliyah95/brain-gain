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

    let feedback = <></>;
    if (props.type === "viewing") {
        feedback = (
            <>
                <p className="text-sm mt-4">
                    The correct answer is{" "}
                    <span className="font-bold">
                        {props.data.answer.toString()}
                    </span>
                    .
                </p>
                {props.data.type === "identification" &&
                    props.data.options.length > 0 && (
                        <p className="text-sm">
                            Other possible answers are:{" "}
                            <span className="font-bold">
                                {props.data.options.join(", ")}.
                            </span>
                        </p>
                    )}
            </>
        );
    }

    const REMARKS = {
        correct: "Awesome! You got it!",
        incorrect: "Not quite right!",
        unanswered: "You skipped this question.",
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
            {feedback}
        </div>
    );
};

export default QuestionCard;
