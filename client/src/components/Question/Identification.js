import React from "react";
import OptionInput from "../Quiz/OptionInput";

const Identification = ({
    possibleAnswers,
    possibleAnswerHandler,
    deletePossibleAnswerHandler,
    newPossibleAnswerHandler,
}) => {
    return (
        <div className="space-y-3">
            <p className="font-semibold">Possible answers</p>
            <ul className="space-y-3">
                {possibleAnswers &&
                    possibleAnswers.map((possibleAnswer, index) => {
                        return (
                            <li key={index}>
                                <OptionInput
                                    id={index + 1}
                                    type="Possible answer"
                                    value={possibleAnswer.value}
                                    handler={possibleAnswerHandler}
                                    deleteHandler={deletePossibleAnswerHandler}
                                />
                            </li>
                        );
                    })}
            </ul>
            <button
                type="button"
                className="underline font-bold my-4"
                onClick={newPossibleAnswerHandler}
            >
                Add another answer
            </button>
        </div>
    );
};

export default Identification;
