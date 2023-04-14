import React from "react";
import OptionInput from "./OptionInput";

const QuestionWithOptions = ({
    options,
    newOptionHandler,
    optionHandler,
    deleteOptionHandler,
    title,
    type,
}) => {
    return (
        <div>
            <p className="font-semibold mt-4 mb-2">{title}</p>
            <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {options.map((option, index) => {
                    return (
                        <li key={index}>
                            <OptionInput
                                id={index + 1}
                                type={type}
                                value={option.value}
                                handler={optionHandler}
                                deleteHandler={deleteOptionHandler}
                            />
                        </li>
                    );
                })}
            </ul>
            <button
                type="button"
                className="underline font-bold my-4"
                onClick={newOptionHandler}
            >
                Add another {type.toLowerCase()}
            </button>
        </div>
    );
};

export default QuestionWithOptions;
