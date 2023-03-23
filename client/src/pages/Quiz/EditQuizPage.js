import React from "react";
import EditQuizForm from "../../components/Quiz/EditQuizForm";
import { getAuthToken } from "../../util/auth";
import { json, redirect } from "react-router-dom";

const EditQuizPage = () => {
    return <EditQuizForm />;
};

export default EditQuizPage;

export const action = async ({ request, params }) => {
    const token = getAuthToken();
    const data = await request.formData();
    const quizDisplayId = params.displayId;

    const newQuizData = {
        title: data.get("title"),
        description: data.get("description"),
    };

    const response = await fetch(
        "http://localhost:8080/api/update_quiz/" + quizDisplayId,
        {
            method: request.method,
            body: JSON.stringify(newQuizData),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 400 || response.status === 404) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Cannot edit quiz set!" }, { status: 500 });
    }

    return redirect(`/quiz/${quizDisplayId}`);
};
