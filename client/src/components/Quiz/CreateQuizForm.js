import { Form, Link } from "react-router-dom";

const CreateQuizForm = () => {
    return (
        <Form
            action=""
            method="POST"
            className="max-w-[1200px] mx-auto  md:p-5 xl:p-8  rounded-md mt-4 lg:mt-10 bg-opacity-80"
        >
            <h3 className="form-title">Create a new quiz set</h3>
            <div className="space-y-5 mt-4 mb-10 xl:mt-10 xl:mb-16">
                <input
                    type="text"
                    name="title"
                    className="line-input"
                    placeholder="A very easy quiz"
                />
                <label htmlFor="title">Title</label>

                <input
                    type="text"
                    name="description"
                    className="line-input"
                    placeholder="You're in for a treat - this quiz is a breeze!"
                />
                <label htmlFor="description">Description</label>
            </div>
            <div className="flex flex-col text-center gap-y-3 lg:flex-row-reverse lg:gap-y-0 lg:gap-x-5 lg:items-center">
                <button className="btn w-full lg:w-auto">Create set</button>
                <Link className="link" to="/quizzes">
                    Cancel
                </Link>
            </div>
        </Form>
    );
};

export default CreateQuizForm;
