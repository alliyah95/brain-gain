import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import {
    useLoaderData,
    useRouteLoaderData,
    useParams,
    json,
    useNavigate,
} from "react-router-dom";
import QuizDescriptionForm from "./QuizDescriptionForm";
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
                    message="Are you sure you want to delete this quiz?"
                />
            )}
            <QuizDescriptionForm
                title="Edit quiz set"
                quizData={quizData}
                method="PATCH"
                onDelete={() => {
                    deleteModalVisibilityHandler(true);
                }}
            />
        </>
    );
};

export default EditQuizForm;
