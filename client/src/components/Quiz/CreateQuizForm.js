import React from "react";
import { Form, Link, json, redirect } from "react-router-dom";
import { getAuthToken } from "../../util/auth";

const CreateQuizForm = () => {
    return (
        <Form
            action=""
            method="POST"
            className="max-w-[1200px] mx-auto bg-light-brown p-8 xl:p-12 rounded-md mt-4 lg:mt-10"
        >
            <h3 className="form-title">Create a new quiz set</h3>
            <div className="space-y-5 mt-4 mb-10 xl:mt-10 xl:mb-16">
                <input
                    type="text"
                    name="title"
                    className="line-input"
                    placeholder="Quiz Title"
                />
                <input
                    type="text"
                    name="description"
                    className="line-input"
                    placeholder="Description"
                />
            </div>
            <div className="flex flex-col text-center gap-y-3 lg:flex-row-reverse lg:gap-y-0 lg:gap-x-5 lg:items-center">
                <button className="btn w-full lg:w-auto">Create set</button>
                <Link className="link" to="/">
                    Cancel
                </Link>
            </div>
        </Form>
    );
};

export default CreateQuizForm;

export const action = async ({ request }) => {
    const data = await request.formData();

    const quizData = {
        title: data.get("title"),
        description: data.get("description"),
    };

    const token = getAuthToken();
    const response = await fetch("http://localhost:8080/api/create_quiz", {
        method: "POST",
        body: JSON.stringify(quizData),
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    if (response.status === 400) {
        return response;
    }

    if (!response.ok) {
        const error = await response.json();
        throw json({ message: error.message }, { status: response.status });
    }

    return redirect("/");
};
