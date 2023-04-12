import {
    useLoaderData,
    Link,
    Form,
    json,
    redirect,
    useRouteLoaderData,
    useNavigate,
} from "react-router-dom";
import { useState, useContext } from "react";
import { getAuthToken } from "../../util/auth";
import UserContext from "../../store/user";
import QuestionCard from "../../components/Question/QuestionCard";
import Modal from "../../components/UI/Modal";

const TestPage = () => {
    const quizData = useLoaderData();
    const token = useRouteLoaderData("root");
    const [showModal, setShowModal] = useState(true);
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    const modalVisibilityHandler = () => {
        setShowModal(false);
    };

    const cancelHandler = () => {
        if (userCtx.username === quizData.creatorUsername) {
            navigate(`/quiz/${quizData.displayId}`);
        } else {
            navigate(`/quizzes`);
        }
    };

    return (
        <>
            {showModal && (
                <Modal
                    message={`You are about to take the quiz ${quizData.title}.`}
                    actionBtn="Continue"
                    blurredBg={true}
                    onCancel={cancelHandler}
                    onAction={modalVisibilityHandler}
                />
            )}

            <div className="max-w-[1200px] mx-auto">
                <p className="text-center font-bold text-2xl">
                    {quizData.title}
                </p>
                <p className="text-center text-yellow ">
                    {quizData.questions.length} questions
                </p>

                <Form method="post" className="mt-8 flex flex-col flex-grow">
                    {quizData.questions.length > 0 && (
                        <>
                            <ul className=" space-y-5 md:space-y-8">
                                {quizData.questions.map((question, index) => {
                                    return (
                                        <li key={question._id}>
                                            <QuestionCard
                                                index={index}
                                                key={question._id}
                                                data={question}
                                                name={`question${index}`}
                                                disabled={false}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="self-end mt-5 md:mt-8">
                                <button className="btn">Submit Quiz</button>
                            </div>
                        </>
                    )}
                </Form>

                {quizData.questions.length === 0 && (
                    <div className="text-center my-20 px-4">
                        <p className="text-2xl lg:text-3xl font-bold mb-5">
                            Oops! This quiz does not have any questions yet
                        </p>

                        {token && (
                            <Link className="btn" to={`/quizzes`}>
                                View my quizzes
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default TestPage;

export const checkQuizResults = async ({ request, params }) => {
    const data = Object.fromEntries(await request.formData());
    const answers = {};
    const token = getAuthToken();
    const displayId = params.displayId;

    for (const key in data) {
        const index = key.match(/\d+/)[0];
        answers[index] = data[key];
    }

    const response = await fetch(
        `http://localhost:8080/api/check_quiz/${displayId}`,
        {
            method: "POST",
            body: JSON.stringify(answers),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (!response.ok) {
        throw json(
            {
                message:
                    "There has been an internal server error. We'll try to fix it ASAP...",
            },
            { status: 500 }
        );
    }

    const resData = await response.json();
    return redirect(
        `/quiz/${resData.displayId}/result/${resData.attemptHistory._id}`
    );
};
