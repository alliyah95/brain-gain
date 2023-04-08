import React from "react";

const QuestionCard = ({
    index,
    data,
    name,
    disabled,
    remark,
    userAnswer,
    type,
}) => {
    let cardContent = null;
    const shuffleOptions = (options) => {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        return options;
    };

    if (data.type === "identification") {
        cardContent = (
            <>
                <input
                    type="text"
                    className="line-input  text-center text-md w-4/5 max-w-md"
                    placeholder={
                        remark === "unanswered" ? "" : "Your answer here..."
                    }
                    name={name}
                    disabled={disabled}
                    defaultValue={userAnswer}
                />
            </>
        );
    } else {
        let finalOptions = [];

        if (data.type === "multiple choice") {
            const choices = data.options;
            finalOptions = shuffleOptions([...choices, data.answer]);
        } else if (data.type === "true or false") {
            finalOptions = data.options;
        }

        cardContent = finalOptions.map((option, index) => {
            return (
                <div className="flex items-center space-x-1" key={index}>
                    <input
                        type="radio"
                        className="radio-btn"
                        value={option}
                        name={name}
                        defaultChecked={userAnswer === option}
                        disabled={disabled}
                    />
                    <label>{option}</label>
                </div>
            );
        });
    }

    let correctAnswer = <></>;
    if (type === "viewing") {
        correctAnswer = (
            <>
                <p className="text-sm mt-4">
                    The correct answer is{" "}
                    <span className="font-bold">{data.answer.toString()}</span>.
                </p>
                {data.type === "identification" && data.options.length > 0 && (
                    <p className="text-sm">
                        Other possible answers are:{" "}
                        <span className="font-bold">
                            {data.options.join(", ")}.
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
                Question {index + 1}
            </p>

            <p className="mb-2">{data.description}</p>
            {type === "viewing" && (
                <p className="text-xs md:text-sm italic text-yellow mb-2">
                    {REMARKS[remark]}
                </p>
            )}
            {cardContent}
            {correctAnswer}
        </div>
    );
};

export default QuestionCard;
