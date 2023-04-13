import { useState } from "react";
import { useRouteLoaderData, json, useNavigate } from "react-router-dom";
import { customToast } from "../../util/customToast";
import TrueOrFalse from "../Question/TrueOrFalse";
import MultipleChoice from "../Question/MultipleChoice";
import Identification from "../Question/Identification";
import Modal from "../UI/Modal";
import { getOptionsInitialState } from "../../util/question";
import { TrashIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

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
                customToast("error", "Please select a question type");
            } else {
                customToast("error", "Invalid question type!");
            }
            return;
        }
        questionData.type = questionType;

        if (questionDescription.trim().length === 0) {
            customToast("error", "Question cannot be empty!");
            return;
        }
        questionData.description = questionDescription;

        if (questionType === "true or false") {
            if (!["true", "false"].includes(correctAnswer)) {
                customToast("error", "Invalid correct answer");
                return;
            }
        } else if (questionType === "multiple choice") {
            if (!correctAnswer.trim()) {
                customToast("error", "Please provide the correct answer");
                return;
            }
            if (choices.length < 1) {
                customToast(
                    "error",
                    "Please provide at least 1 incorrect choice"
                );
                return;
            } else {
                let filteredChoices = choices.filter(
                    (choice) => choice.value.trim() !== ""
                );
                let answerInChoices = filteredChoices.find(
                    (choice) => choice.value === correctAnswer
                );

                if (answerInChoices) {
                    customToast(
                        "error",
                        "Correct answer cannot be in incorrect choices"
                    );
                    return;
                }

                if (filteredChoices.length < 1) {
                    customToast(
                        "error",
                        "Please provide at least 1 incorrect choice"
                    );
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
                customToast("error", "Please provide the correct answer");
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
            customToast("success", "Question successfully updated!");
            navigate(`/quiz/${props.displayId}`);
        } else {
            customToast("success", "Question successfully added!");
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

        customToast("success", "Question successfully deleted");
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
                className={
                    props.method === "POST" ? "preview-card" : "edit-form"
                }
            >
                <h3 className="font-bold text-2xl lg:text-3xl mb-4 flex justify-between text-brown-darker">
                    {props.method === "POST" ? "New" : "Edit"} question
                    {props.method !== "POST" && (
                        <button
                            className="inline-flex items-center gap-x-2 text-sm hover:text-yellow"
                            type="button"
                            onClick={() => {
                                deleteModalVisibilityHandler(true);
                            }}
                        >
                            <TrashIcon className="h-6 w-6 " />
                        </button>
                    )}
                </h3>

                <label htmlFor="type" className="mr-2 mb-2">
                    Question Type:
                </label>
                <div className="relative inline-flex mb-2">
                    <select
                        className="text-sm cursor-pointer appearance-none bg-brown-darker text-light-brown py-2 px-3 pr-8 rounded-md outline-0"
                        defaultValue={
                            props.questionData ? props.questionData.type : ""
                        }
                        onChange={(evt) => {
                            setQuestionType(evt.target.value);
                        }}
                    >
                        <option value="" disabled>
                            Please select
                        </option>
                        <option value="true or false">True or False</option>
                        <option value="multiple choice">Multiple Choice</option>
                        <option value="identification">Identification</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <ChevronDownIcon className="h-5 w-5 text-light-brown" />
                    </div>
                </div>

                <input
                    id="question"
                    type="text"
                    placeholder="Enter your question here..."
                    className="line-input md:mt-4"
                    onChange={(evt) => {
                        setQuestionDescription(evt.target.value);
                    }}
                    defaultValue={
                        props.method === "PATCH"
                            ? props.questionData.description
                            : ""
                    }
                />
                <label htmlFor="question">Question</label>

                {((questionType && questionType !== "true or false") ||
                    (props.method === "PATCH" &&
                        questionType !== "true or false")) && (
                    <>
                        {" "}
                        <input
                            type="text"
                            id="correctAnswer"
                            placeholder="Enter the correct answer here..."
                            className="line-input mt-4"
                            onChange={(evt) => {
                                setCorrectAnswer(evt.target.value);
                            }}
                            defaultValue={
                                props.method === "PATCH"
                                    ? props.questionData.answer
                                    : ""
                            }
                        />
                        <label htmlFor="correctAnswer">Correct answer</label>
                    </>
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
                        className="link text-sm"
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
