import React from "react";
import OptionInput from "../Quiz/OptionInput";

const MultipleChoice = ({
    choices,
    newChoiceHandler,
    choiceHandler,
    deleteChoiceHandler,
}) => {
    return (
        <div>
            <p className="font-semibold mt-4 mb-2">Incorrect choices</p>
            <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
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
            <button
                type="button"
                className="underline font-bold my-4"
                onClick={newChoiceHandler}
            >
                Add another choice
            </button>
        </div>
    );
};

export default MultipleChoice;
