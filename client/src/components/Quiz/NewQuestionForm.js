import { useState } from "react";
import { useLoaderData, useRouteLoaderData, json } from "react-router-dom";
import { toast } from "react-toastify";

const NewQuestionForm = (props) => {
    const [questionDescription, setQuestionDescription] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [choices, setChoices] = useState([]);
    const quizData = useLoaderData();
    const token = useRouteLoaderData("root");

    const displayId = quizData.displayId;

    const descriptionHandler = (evt) => {
        setQuestionDescription(evt.target.value);
    };

    const questionTypeHandler = (evt) => {
        setQuestionType(evt.target.value);
    };

    const answerHandler = (evt) => {
        setCorrectAnswer(evt.target.value);
    };

    const newQuestionHandler = async (evt) => {
        evt.preventDefault();

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

        if (questionDescription.trim().length === 0) {
            toast.error("Question cannot be empty!");
            return;
        }

        if (questionType === "true or false") {
            if (!["true", "false"].includes(correctAnswer)) {
                toast.error("Invalid correct answer");
                return;
            }
        }

        const questionData = {
            type: questionType,
            description: questionDescription,
            answer: correctAnswer,
        };

        const response = await fetch(
            "http://localhost:8080/api/add_question/" + displayId,
            {
                method: "POST",
                body: JSON.stringify(questionData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            toast.error(error.message);
            return;
        }

        toast.success("Question successfully added!");
        setQuestionDescription("");
        setQuestionType("");
        setCorrectAnswer("");
        props.onToggleForm();
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
                    value={questionType}
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
                className="line-input text-sm mt-4 mb-2"
                onChange={descriptionHandler}
                value={questionDescription}
            />

            {questionType && questionType !== "true or false" && (
                <input
                    type="text"
                    placeholder="Correct answer"
                    className="line-input text-sm mt-2 mb-6"
                    value={questionType}
                />
            )}

            {questionType && questionType === "true or false" && (
                <div className="space-y-3">
                    <p className="font-semibold">Correct Answer</p>
                    <ul className="space-y-1">
                        <li>
                            <input
                                type="radio"
                                className="radio-btn"
                                value="true"
                                onChange={answerHandler}
                            />
                            <label htmlFor="true">True</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                value="false"
                                className="radio-btn"
                                onChange={answerHandler}
                            />
                            <label htmlFor="false">False</label>
                        </li>
                    </ul>
                </div>
            )}

            {questionType && questionType === "multiple choice" && (
                <>
                    <div className="space-y-3">
                        <p className="font-semibold">Choices</p>
                        <ul className="space-y-3">
                            <li>
                                <input
                                    type="text"
                                    name="choice"
                                    placeholder="Choice 1"
                                    className="line-input text-sm"
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="choice"
                                    placeholder="Choice 2"
                                    className="line-input text-sm"
                                />
                            </li>
                            <li>
                                <input
                                    type="text"
                                    name="choice"
                                    placeholder="Choice 3"
                                    className="line-input text-sm"
                                />
                            </li>
                        </ul>
                    </div>
                    <button className="underline font-bold my-4">
                        Add another choice
                    </button>
                </>
            )}

            {questionType && questionType === "identification" && (
                <div className="space-y-3">
                    <p className="font-semibold">Possible answers</p>
                    <ul className="space-y-3">
                        <li>
                            <input
                                type="text"
                                name="possibleAnswer"
                                placeholder="Possible answer 1"
                                className="line-input text-sm"
                            />
                        </li>
                        <li>
                            <input
                                type="text"
                                name="possibleAnswer"
                                placeholder="Possible answer 2"
                                className="line-input text-sm"
                            />
                        </li>
                        <li>
                            <input
                                type="text"
                                name="possibleAnswer"
                                placeholder="Possible answer 3"
                                className="line-input text-sm"
                            />
                        </li>
                    </ul>
                    <button className="underline font-bold my-4">
                        Add another answer
                    </button>
                </div>
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
