import React, { useContext } from "react";
import CreateQuizForm from "../../components/Quiz/CreateQuizForm";
import { json, redirect, useActionData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import NotificationContext from "../../store/toast";

const CreateQuizPage = () => {
    const data = useActionData();
    const notifCtx = useContext(NotificationContext);

    if (data && data.message) {
        notifCtx.onNotify(data.message);
        data.message = "";
    }

    return <CreateQuizForm />;
};

export default CreateQuizPage;

export const action = async ({ request }) => {
    const data = await request.formData();

    const quizData = {
        title: data.get("title"),
        description: data.get("description"),
    };

    const token = getAuthToken();
    const response = await fetch("http://localhost:8080/api/create_quiz", {
        method: "POST",
        body: JSON.stringify(quizData),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    if (response.status === 400) {
        return response;
    }

    if (!response.ok) {
        const error = await response.json();
        throw json({ message: error.message }, { status: response.status });
    }

    const resData = await response.json();

    return redirect(`/quiz/${resData.quiz.displayId}`);
};
