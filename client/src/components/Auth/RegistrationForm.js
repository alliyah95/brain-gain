import React, { useContext } from "react";
import { Link, Form, json, redirect, useActionData } from "react-router-dom";
import NotificationContext from "../../store/toast";

const RegistrationForm = () => {
    const notifCtx = useContext(NotificationContext);
    const data = useActionData();

    if (data && data.message) {
        notifCtx.onNotify(data.message);
        data.message = "";
    }

    return (
        <Form action="" method="post">
            <div className="space-y-5 mb-8">
                <input
                    type="text"
                    className="line-input"
                    placeholder="Name"
                    name="name"
                    required
                />
                <input
                    type="text"
                    className="line-input"
                    placeholder="Username"
                    name="username"
                    required
                />
                <input
                    type="password"
                    className="line-input"
                    placeholder="Password"
                    name="password"
                    required
                />
                <input
                    type="password"
                    className="line-input"
                    placeholder="Confirm password"
                    name="confirmedPassword"
                    required
                />
            </div>

            <button className="btn w-full mb-3">Create account</button>
            <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className="link">
                    Sign in
                </Link>
            </p>
        </Form>
    );
};

export default RegistrationForm;

export const action = async ({ request, params }) => {
    const data = await request.formData();

    const newUserdata = {
        name: data.get("name"),
        username: data.get("username"),
        password: data.get("password"),
        confirmedPassword: data.get("confirmedPassword"),
    };

    const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: JSON.stringify(newUserdata),
        headers: { "Content-Type": "application/json" },
    });

    if (response.status === 400) {
        return response;
    }

    if (!response.ok) {
        const error = await response.json();
        throw json({ message: error.message }, { status: response.status });
    }

    const resData = await response.json();
    const token = resData.token;
    const user = resData.user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
};
