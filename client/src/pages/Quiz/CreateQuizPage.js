import CreateQuizForm from "../../components/Quiz/CreateQuizForm";
import { json, redirect, useActionData } from "react-router-dom";
import { getAuthToken } from "../../util/auth";
import { customToast } from "../../util/customToast";

const CreateQuizPage = () => {
    const error = useActionData();

    if (error && error.message) {
        customToast("error", error.message);
        error.message = "";
    }

    return <CreateQuizForm />;
};

export default CreateQuizPage;

export const createQuizAction = async ({ request }) => {
    const data = await request.formData();

    const quizData = {
        title: data.get("title"),
        description: data.get("description"),
        isPublic: Boolean(data.get("quizAccess")),
    };

    const token = getAuthToken();
    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}create_quiz`,
        {
            method: "POST",
            body: JSON.stringify(quizData),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 400) {
        return response;
    }

    if (!response.ok) {
        if (!response.ok) {
            throw json(
                {
                    message:
                        "There has been an internal server error. We'll try to fix it ASAP...",
                },
                { status: 500 }
            );
        }
    }

    const resData = await response.json();

    return redirect(`/quiz/${resData.quiz.displayId}`);
};
