import React from "react";
import { getAuthToken } from "../../util/auth";
import { json, useLoaderData } from "react-router-dom";
import QuestionForm from "../../components/Quiz/QuestionForm";

const EditQuestionPage = () => {
    const { question, quizDisplayId } = useLoaderData();

    return (
        <div>
            <QuestionForm
                method="PATCH"
                questionData={question}
                displayId={quizDisplayId}
            />
        </div>
    );
};

export default EditQuestionPage;

export const questionLoader = async ({ request, params }) => {
    const quizDisplayId = params.displayId;
    const questionId = params.questionId;
    const token = getAuthToken();

    const response = await fetch(
        `http://localhost:8080/api/get_question/${quizDisplayId}/${questionId}`,
        {
            headers: {
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 401) {
        throw json(
            { message: "You are not allowed to edit this question." },
            { status: 401 }
        );
    }

    if (response.status === 404) {
        throw json({ message: "Question not found." }, { status: 404 });
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

    const data = await response.json();
    return { question: data.question, quizDisplayId };
};
