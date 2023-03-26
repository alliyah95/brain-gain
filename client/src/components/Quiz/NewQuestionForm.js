import { useState } from "react";
import { Form, useLoaderData } from "react-router-dom";

const NewQuestionForm = (props) => {
    const [questionType, setQuestionType] = useState("");
    const quizData = useLoaderData();

    const displayId = quizData.displayId;

    const questionTypeHandler = (event) => {
        setQuestionType(event.target.value);
    };

    const cancelAddHandler = () => {
        props.onCancel();
    };

    return (
        <Form
            action={`/quiz/${displayId}/new_question`}
            method="POST"
            className="mx-auto bg-light-brown p-5 xl:p-8 rounded-md mt-4 lg:mt-10 text-brown-darker"
        >
            <h3 className="font-bold text-2xl lg:text-3xl mb-4">
                New Question
            </h3>

            <label htmlFor="type" className="mr-2">
                Question Type:
            </label>
            <div className="relative inline-flex">
                <select
                    name="type"
                    id="type"
                    className="text-sm cursor-pointer appearance-none bg-brown-darker text-white py-2 px-3 pr-7 rounded-md focus:border focus:border-yellow focus:ring-yellow"
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
                        className="bi bi-caret-down-fill text-white"
                        viewBox="0 0 16 16"
                    >
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </div>
            </div>

            <input
                type="text"
                name="description"
                placeholder="Question"
                className="line-input text-sm mt-4 mb-2"
            />

            {questionType && questionType !== "true or false" && (
                <input
                    type="text"
                    name="correctAnswer"
                    placeholder="Correct answer"
                    className="line-input text-sm mt-2 mb-6"
                />
            )}

            {questionType && questionType === "true or false" && (
                <div className="space-y-3">
                    <p className="font-semibold">Correct Answer</p>
                    <ul className="space-y-1">
                        <li>
                            <input
                                type="radio"
                                name="correctAnswerTF"
                                id="true"
                                className="radio-btn"
                                value="true"
                            />
                            <label htmlFor="true">True</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                name="correctAnswerTF"
                                id="false"
                                value="false"
                                className="radio-btn"
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
        </Form>
    );
};

export default NewQuestionForm;
