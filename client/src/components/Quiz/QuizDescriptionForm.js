import { Form, Link, useLocation, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const QuizDescriptionForm = ({ title, method, onDelete, quizData }) => {
    const location = useLocation();
    const { displayId } = useParams();

    return (
        <Form method={method} className="edit-form">
            <h3
                className={`form-title ${
                    method === "PATCH" ? "flex justify-between" : ""
                }`}
            >
                {title}
                {method === "PATCH" && (
                    <button
                        className="inline-flex items-center gap-x-2 text-sm hover:text-yellow"
                        onClick={onDelete}
                        type="button"
                    >
                        <TrashIcon className="h-6 w-6 " />
                    </button>
                )}
            </h3>
            <div className="space-y-5 mt-4 xl:mt-10 mb-8 ">
                <input
                    type="text"
                    name="title"
                    className="line-input"
                    placeholder="A very easy quiz"
                    defaultValue={quizData && quizData.title}
                />
                <label htmlFor="title">Title</label>

                <input
                    type="text"
                    name="description"
                    className="line-input"
                    placeholder="You're in for a treat - this quiz is a breeze!"
                    defaultValue={quizData && quizData.description}
                />
                <label htmlFor="description">Description</label>
            </div>

            <div className="space-x-2 mb-10 xl:mb-16 text-brown">
                <input
                    type="checkbox"
                    name="quizAccess"
                    defaultChecked={quizData && quizData.isPublic}
                />
                <label className="text-base font-normal">
                    Make the quiz public
                </label>
            </div>

            <div className="flex flex-col text-center gap-y-3 lg:flex-row-reverse lg:gap-y-0 lg:gap-x-5 lg:items-center">
                <button className="btn w-full lg:w-auto">Save</button>
                <Link
                    className="link"
                    to={
                        location.pathname.includes("edit")
                            ? `/quiz/${displayId}`
                            : "/quizzes"
                    }
                >
                    Cancel
                </Link>
            </div>
        </Form>
    );
};

export default QuizDescriptionForm;
