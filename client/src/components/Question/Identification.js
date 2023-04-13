import React from "react";
import OptionInput from "../Quiz/OptionInput";

const Identification = ({
    possibleAnswers,
    possibleAnswerHandler,
    deletePossibleAnswerHandler,
    newPossibleAnswerHandler,
}) => {
    return (
        <div>
            <p className="font-semibold mt-4 mb-2">Possible answers</p>
            <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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
