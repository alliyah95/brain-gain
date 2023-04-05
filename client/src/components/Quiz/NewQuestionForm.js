import { useState } from "react";
import { useRouteLoaderData, json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OptionInput from "./OptionInput";
import TrueOrFalse from "../Question/TrueOrFalse";
import MultipleChoice from "../Question/MultipleChoice";
import Identification from "../Question/Identification";
import { formatChoices } from "../../util/question";

const NewQuestionForm = (props) => {
    const [questionDescription, setQuestionDescription] = useState(
        (props.questionData && props.questionData.description) || ""
    );
    const [questionType, setQuestionType] = useState(
        (props.questionData && props.questionData.type) || ""
    );
    const [correctAnswer, setCorrectAnswer] = useState(
        (props.questionData && props.questionData.answer.toString()) || ""
    );

    const optionsInitialState = [
        {
            id: 1,
            value: "",
        },
    ];

    const [choices, setChoices] = useState(() => {
        if (
            props.questionData &&
            props.questionData.options &&
            props.questionData.type !== "true or false"
        ) {
            return formatChoices(props.questionData.options);
        } else {
            return optionsInitialState;
        }
    });
    const [possibleAnswers, setPossibleAnswers] = useState(() => {
        if (
            props.questionData &&
            props.questionData.options &&
            props.questionData.type !== "true or false"
        ) {
            return formatChoices(props.questionData.options);
        } else {
            return optionsInitialState;
        }
    });

    const token = useRouteLoaderData("root");
    const navigate = useNavigate();

    const descriptionHandler = (evt) => {
        setQuestionDescription(evt.target.value);
    };

    const questionTypeHandler = (evt) => {
        setQuestionType(evt.target.value);
    };

    const answerHandler = (evt) => {
        setCorrectAnswer(evt.target.value);
    };

    const possibleAnswerHandler = (evt) => {
        const index = evt.target.id;
        setPossibleAnswers((possibleAnswer) => {
            const tempPossibleAnswers = possibleAnswer.slice();
            tempPossibleAnswers[index - 1] = evt.target.value;
            return tempPossibleAnswers;
        });
    };

    const newPossibleAnswerHandler = (evt) => {
        setPossibleAnswers((possibleAnswer) => {
            return [
                ...possibleAnswer,
                {
                    value: "",
                },
            ];
        });
    };

    const deletePossibleAnswerHandler = (index) => {
        setPossibleAnswers((possibleAnswer) => {
            const tempPossibleAnswers = [...possibleAnswer];
            tempPossibleAnswers.splice(index, 1);
            return tempPossibleAnswers;
        });
    };

    const choiceHandler = (evt) => {
        const index = evt.target.id;
        setChoices((choice) => {
            const tempChoices = choice.slice();
            tempChoices[index - 1].value = evt.target.value;
            return tempChoices;
        });
    };

    const newChoiceHandler = (evt) => {
        setChoices((choice) => {
            return [
                ...choice,
                {
                    value: "",
                },
            ];
        });
    };

    const deleteChoiceHandler = (index) => {
        setChoices((choice) => {
            const tempChoices = [...choice];
            tempChoices.splice(index, 1);
            return tempChoices;
        });
    };

    const newQuestionHandler = async (evt) => {
        evt.preventDefault();

        const questionData = {};

        const QUESTION_TYPES = [
            "true or false",
            "multiple choice",
            "identification",
        ];

        if (!QUESTION_TYPES.includes(questionType)) {
            if (questionType === null) {
                toast.error("Please select a question type.");
            } else {
                toast.error("Invalid question type!");
            }
            return;
        }
        questionData.type = questionType;

        if (questionDescription.trim().length === 0) {
            toast.error("Question cannot be empty!");
            return;
        }
        questionData.description = questionDescription;

        if (questionType === "true or false") {
            if (!["true", "false"].includes(correctAnswer)) {
                toast.error("Invalid correct answer");
                return;
            }
        } else if (questionType === "multiple choice") {
            if (!correctAnswer.trim()) {
                toast.error("Please provide the correct answer.");
                return;
            }
            if (choices.length < 1) {
                toast.error("Please provide at least 1 choice");
                return;
            } else {
                let filteredChoices = choices.filter(
                    (choice) => choice.value.trim() !== ""
                );
                let answerInChoices = filteredChoices.find(
                    (choice) => choice.value === correctAnswer
                );

                if (answerInChoices) {
                    toast.error("Correct answer cannot be in other choices.");
                    return;
                }

                if (filteredChoices.length < 1) {
                    toast.error("Please provide at least 1 choice");
                    return;
                } else {
                    const choiceValues = filteredChoices.map(
                        (choice) => choice.value
                    );
                    questionData.options = choiceValues;
                }
            }
        } else if (questionType === "identification") {
            if (!correctAnswer.trim()) {
                toast.error("Please provide the correct answer.");
                return;
            }
            if (possibleAnswers.length > 0) {
                const filteredPossibleAnswers = possibleAnswers.filter(
                    (posAns) => posAns.value.trim() !== ""
                );

                if (filteredPossibleAnswers) {
                    questionData.options = filteredPossibleAnswers;
                }
            }
        }
        questionData.answer = correctAnswer;

        const api =
            props.method === "POST"
                ? `add_question/${props.displayId}`
                : `edit_question/${props.displayId}/${props.questionData._id}`;

        const response = await fetch(`http://localhost:8080/api/${api}`, {
            method: props.method,
            body: JSON.stringify(questionData),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        if (!response.ok) {
            throw json(
                {
                    message:
                        "There has been an internal server error. We'll try to fix it ASAP...",
                },
                { status: 500 }
            );
        }

        if (props.method === "PATCH") {
            toast.success("Question successfully updated!");
            navigate(`/quiz/${props.displayId}`);
        } else {
            toast.success("Question successfully added!");
            props.onToggleForm();
            props.onAddQuestion();
        }
    };

    const cancelAddHandler = () => {
        props.onToggleForm();
    };

    return (
        <form
            onSubmit={newQuestionHandler}
            className="mx-auto bg-light-brown p-5 xl:p-8 rounded-md mt-4 lg:mt-10 text-brown-darker bg-opacity-80"
        >
            <h3 className="font-bold text-2xl lg:text-3xl mb-4">
                New Question
            </h3>

            <label htmlFor="type" className="mr-2">
                Question Type:
            </label>
            <div className="relative inline-flex">
                <select
                    className="text-sm cursor-pointer appearance-none bg-brown-darker text-light-brown py-2 px-3 pr-7 rounded-md outline-0"
                    defaultValue={
                        props.questionData ? props.questionData.type : ""
                    }
                    onChange={questionTypeHandler}
                >
                    <option value="" disabled>
                        Please select...
                    </option>
                    <option value="true or false">True or False</option>
                    <option value="multiple choice">Multiple Choice</option>
                    <option value="identification">Identification</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pl-2 pr-4 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="currentColor"
                        className="bi bi-caret-down-fill text-light-brown"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </div>
            </div>

            <input
                type="text"
                placeholder="Question"
                className="line-input text-sm md:text-mt-4 mb-2"
                onChange={descriptionHandler}
                defaultValue={
                    props.method === "PATCH"
                        ? props.questionData.description
                        : ""
                }
            />

            {((questionType && questionType !== "true or false") ||
                (props.method === "PATCH" &&
                    questionType !== "true or false")) && (
                <input
                    type="text"
                    placeholder="Correct answer"
                    className="line-input text-sm mt-2 mb-6"
                    onChange={answerHandler}
                    defaultValue={
                        props.method === "PATCH"
                            ? props.questionData.answer
                            : ""
                    }
                />
            )}

            {((questionType && questionType === "true or false") ||
                (props.method === "PATCH" &&
                    questionType === "true or false")) && (
                <TrueOrFalse
                    answerHandler={answerHandler}
                    correctAnswer={
                        props.questionData ? props.questionData.answer : ""
                    }
                />
            )}

            {((questionType && questionType === "multiple choice") ||
                (props.method === "PATCH" &&
                    questionType === "multiple choice")) && (
                <MultipleChoice
                    choices={choices}
                    newChoiceHandler={newChoiceHandler}
                    choiceHandler={choiceHandler}
                    deleteChoiceHandler={deleteChoiceHandler}
                />
            )}

            {((questionType && questionType === "identification") ||
                (props.method === "PATCH" &&
                    questionType === "identification")) && (
                <Identification
                    possibleAnswers={possibleAnswers}
                    possibleAnswerHandler={possibleAnswerHandler}
                    deletePossibleAnswerHandler={deletePossibleAnswerHandler}
                    newPossibleAnswerHandler={newPossibleAnswerHandler}
                />
            )}

            <div className="space-x-3 lg:space-x-4 xl:space-x-6 text-end mt-5">
                <button
                    className="link"
                    type="button"
                    onClick={cancelAddHandler}
                >
                    Cancel
                </button>
                <button className="btn">Add question</button>
            </div>
        </form>
    );
};

export default NewQuestionForm;
