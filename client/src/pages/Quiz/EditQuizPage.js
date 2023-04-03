import EditQuizForm from "../../components/Quiz/EditQuizForm";
import { getAuthToken } from "../../util/auth";
import { json, redirect, useActionData } from "react-router-dom";
import { toast } from "react-toastify";

const EditQuizPage = () => {
    const error = useActionData();

    if (error && error.message) {
        toast.error(error.message);
        error.message = "";
    }

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

    if (response.status === 400) {
        return response;
    }

    if (response.status === 404) {
        throw json({ message: "Quiz not found!" }, { status: 400 });
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

    return redirect(`/quiz/${quizDisplayId}`);
};
