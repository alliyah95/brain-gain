import React from "react";
import OptionInput from "../Quiz/OptionInput";

const MultipleChoice = ({
    choices,
    newChoiceHandler,
    choiceHandler,
    deleteChoiceHandler,
}) => {
    return (
        <>
            <div className="space-y-3">
                <p className="font-semibold">Choices</p>
                <ul className="space-y-3">
                    {choices.map((choice, index) => {
                        return (
                            <li key={index}>
                                <OptionInput
                                    id={index + 1}
                                    type="Choice"
                                    value={choice.value}
                                    handler={choiceHandler}
                                    deleteHandler={deleteChoiceHandler}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <button
                type="button"
                className="underline font-bold my-4"
                onClick={newChoiceHandler}
            >
                Add another choice
            </button>
        </>
    );
};

export default MultipleChoice;
