import { json } from "react-router-dom";

export const loadQuizDetail = async (displayId, token) => {
    const response = await fetch(
        "http://localhost:8080/api/quiz/" + displayId,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 401) {
        throw json(
            {
                message: "Oops! You are unauthorized to access this quiz.",
            },
            { status: 401 }
        );
    }

    if (response.status === 404) {
        throw json(
            {
                message: "Quiz not found!",
            },
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

    const data = await response.json();
    return data.quiz;
};
