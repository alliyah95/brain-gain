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
                    className="line-input text-center text-base w-4/5 max-w-sm"
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

        cardContent = (
            <ul className="grid lg:grid-cols-2 gap-1 lg:gap-y-2 lg:gap-x-4">
                {finalOptions.map((option, index) => {
                    return (
                        <li className="flex items-center space-x-1" key={index}>
                            <input
                                id={index}
                                type="radio"
                                className="radio-btn"
                                value={option}
                                name={name}
                                defaultChecked={userAnswer === option}
                                disabled={disabled}
                            />
                            <label
                                className={`test-option ${
                                    data.type === "true or false"
                                        ? "capitalize"
                                        : ""
                                }`}
                                htmlFor={index}
                            >
                                {option}
                            </label>
                        </li>
                    );
                })}
            </ul>
        );
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
                        {data.options.length === 1
                            ? "Another possible answer is "
                            : "Other possible answers are: "}
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

            <p className="mb-2 text-center">{data.description}</p>
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
