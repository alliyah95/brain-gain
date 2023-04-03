import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import {
    Link,
    Form,
    useLoaderData,
    useRouteLoaderData,
    useParams,
    json,
    useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

const EditQuizForm = () => {
    const quizData = useLoaderData();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const token = useRouteLoaderData("root");
    const { displayId } = useParams();
    const navigate = useNavigate();

    const deleteModalVisibilityHandler = (visibility) => {
        setShowDeleteModal(visibility);
    };

    const deleteQuizHandler = async () => {
        setShowDeleteModal(false);

        const response = await fetch(
            "http://localhost:8080/api/delete_quiz/" + displayId,
            {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );

        if (response.status === 404) {
            throw json({ message: "Quiz not found!" }, { status: 404 });
        }
        if (!response.ok) {
            throw json({ message: "Failed to delete quiz." }, { status: 500 });
        }

        toast.success("Quiz successfully deleted.");
        navigate("/quizzes");
    };

    return (
        <>
            {showDeleteModal && (
                <ConfirmModal
                    onManageModal={deleteModalVisibilityHandler}
                    onDelete={deleteQuizHandler}
                />
            )}
            <Form
                action=""
                method="PATCH"
                className="max-w-[1200px] mx-auto md:p-5 xl:p-8  rounded-md mt-4 lg:mt-10 bg-opacity-80"
            >
                <h3 className="form-title flex justify-between">
                    Edit quiz <span></span>{" "}
                    <button
                        className="inline-flex items-center gap-x-2 text-sm hover:text-yellow"
                        onClick={() => {
                            deleteModalVisibilityHandler(true);
                        }}
                        type="button"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-trash3 w-5"
                            viewBox="0 0 16 16"
                        >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </button>
                </h3>

                <div className="space-y-5 mt-4 mb-10 xl:mt-10 xl:mb-16">
                    <input
                        type="text"
                        name="title"
                        className="line-input"
                        placeholder="A very easy quiz"
                        id="title"
                        defaultValue={quizData.title}
                    />
                    <label htmlFor="title">Title</label>

                    <input
                        type="text"
                        name="description"
                        className="line-input"
                        placeholder="You're in for a treat - this quiz is a breeze!"
                        id="description"
                        defaultValue={quizData.description}
                    />
                    <label>Description</label>
                </div>
                <div className="flex flex-col text-center gap-y-3 lg:flex-row-reverse lg:gap-y-0 lg:gap-x-5 lg:items-center">
                    <button className="btn w-full lg:w-auto">
                        Save Changes
                    </button>
                    <Link className="link" to={`/quiz/${quizData.displayId}`}>
                        Cancel
                    </Link>
                </div>
            </Form>
        </>
    );
};

export default EditQuizForm;
