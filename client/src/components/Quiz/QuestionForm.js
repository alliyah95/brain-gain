import { useState } from "react";
import { useRouteLoaderData, json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TrueOrFalse from "../Question/TrueOrFalse";
import MultipleChoice from "../Question/MultipleChoice";
import Identification from "../Question/Identification";
import Modal from "../UI/Modal";
import { getOptionsInitialState } from "../../util/question";

const QuestionForm = (props) => {
    const {
        description = "",
        type = "",
        answer = "",
    } = props.questionData || "";

    const [questionDescription, setQuestionDescription] = useState(description);
    const [questionType, setQuestionType] = useState(type);
    const [correctAnswer, setCorrectAnswer] = useState(answer.toString());

    const [choices, setChoices] = useState(() => {
        return getOptionsInitialState(props);
    });
    const [possibleAnswers, setPossibleAnswers] = useState(() => {
        return getOptionsInitialState(props);
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = useRouteLoaderData("root");
    const navigate = useNavigate();

    const generalOptionHandler = (index, updatedValue, setState) => {
        setState((prevState) => {
            const tempOptions = prevState.slice();
            tempOptions[index - 1].value = updatedValue;
            return tempOptions;
        });
    };

    const generalNewOptionHandler = (setState) => {
        setState((prevState) => {
            return [
                ...prevState,
                {
                    value: "",
                },
            ];
        });
    };

    const generalDeleteOptionHandler = (index, setState) => {
        setState((prevState) => {
            const tempOptions = [...prevState];
            tempOptions.splice(index, 1);
            return tempOptions;
        });
    };

    const possibleAnswerHandler = (evt) => {
        generalOptionHandler(
            evt.target.id,
            evt.target.value,
            setPossibleAnswers
        );
    };

    const choiceHandler = (evt) => {
        generalOptionHandler(evt.target.id, evt.target.value, setChoices);
    };

    const newPossibleAnswerHandler = () => {
        generalNewOptionHandler(setPossibleAnswers);
    };

    const newChoiceHandler = () => {
        generalNewOptionHandler(setChoices);
    };

    const deletePossibleAnswerHandler = (index) => {
        generalDeleteOptionHandler(index, setPossibleAnswers);
    };

    const deleteChoiceHandler = (index) => {
        generalDeleteOptionHandler(index, setChoices);
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
                    questionData.options = filteredPossibleAnswers.map(
                        (answer) => answer.value
                    );
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

    const deleteModalVisibilityHandler = (visibility) => {
        setShowDeleteModal(visibility);
    };

    const deleteQuestionHandler = async () => {
        setShowDeleteModal(false);

        const response = await fetch(
            `http://localhost:8080/api/delete_question/${props.displayId}/${props.questionData._id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (response.status === 404) {
            throw json(
                { message: "Quiz or question not found!" },
                { status: 404 }
            );
        }

        if (!response.ok) {
            throw json(
                {
                    message:
                        "There has been an internal server error. We'll try to fix it ASAP...",
                },
                { status: 500 }
            );
        }

        toast.success("Question successfully deleted.");
        navigate(`/quiz/${props.displayId}`);
    };

    const cancelAddHandler = () => {
        if (props.method === "POST") {
            props.onToggleForm();
        } else {
            navigate(`/quiz/${props.displayId}`);
        }
    };

    return (
        <>
            {showDeleteModal && (
                <Modal
                    onAction={deleteQuestionHandler}
                    onCancel={deleteModalVisibilityHandler}
                    message="Are you sure you want to delete this question?"
                    actionBtn="Yes"
                />
            )}
            <form
                onSubmit={newQuestionHandler}
                className="mx-auto bg-light-brown p-5 xl:p-8 rounded-md mt-4 lg:mt-10 text-brown-darker bg-opacity-80"
            >
                <h3 className="font-bold text-2xl lg:text-3xl mb-4 flex justify-between">
                    {props.method === "POST" ? "New" : "Edit"} question
                    {props.method !== "POST" && (
                        <button
                            className="inline-flex items-center gap-x-2 text-sm hover:text-yellow"
                            type="button"
                            onClick={() => {
                                deleteModalVisibilityHandler(true);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-trash3 w-5"
                                viewBox="0 0 16 16"
                            >
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                        </button>
                    )}
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
                        onChange={(evt) => {
                            setQuestionType(evt.target.value);
                        }}
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
                    onChange={(evt) => {
                        setQuestionDescription(evt.target.value);
                    }}
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
                        onChange={(evt) => {
                            setCorrectAnswer(evt.target.value);
                        }}
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
                        answerHandler={(evt) => {
                            setCorrectAnswer(evt.target.value);
                        }}
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
                        deletePossibleAnswerHandler={
                            deletePossibleAnswerHandler
                        }
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
                    <button className="btn">
                        {props.method === "POST"
                            ? "Add question"
                            : "Save changes"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default QuestionForm;
