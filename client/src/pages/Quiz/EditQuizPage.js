import { getAuthToken } from "../../util/auth";
import { json, redirect, useActionData } from "react-router-dom";
import { customToast } from "../../util/customToast";
import { EditQuizForm } from "../../components";

const EditQuizPage = () => {
    const error = useActionData();

    if (error && error.message) {
        customToast("error", error.message);
        error.message = "";
    }

    return <EditQuizForm />;
};

export default EditQuizPage;

export const editQuizAction = async ({ request, params }) => {
    const token = getAuthToken();
    const data = await request.formData();
    const quizDisplayId = params.displayId;

    const newQuizData = {
        title: data.get("title"),
        description: data.get("description"),
        isPublic: Boolean(data.get("quizAccess")),
    };

    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}update_quiz/${quizDisplayId}`,
        {
            method: request.method,
            body: JSON.stringify(newQuizData),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (
        response.status === 404 ||
        response.status === 401 ||
        response.status === 400
    ) {
        throw response;
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

    customToast("success", "Quiz succesfully edited");
    return redirect(`/quiz/${quizDisplayId}`);
};
