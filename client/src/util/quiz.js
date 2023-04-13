import { json } from "react-router-dom";

export const loadQuizDetail = async (displayId, token) => {
    const access = !token ? "/public" : "";

    const response = await fetch(
        `http://localhost:8080/api/quiz/${displayId}${access}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 401 || response.status === 404) {
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

    const data = await response.json();
    return data.quiz;
};

export const formatDateTime = (dateTime) => {
    const attemptDate = new Date(dateTime);
    const month = attemptDate.toLocaleString("default", { month: "long" });
    const time = attemptDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    const formattedDatetime = `${month} ${attemptDate.getDate()}, ${attemptDate.getFullYear()} at ${time}`;
    return formattedDatetime;
};
