import React, { useContext } from "react";
import { Form, Link, json, redirect, useActionData } from "react-router-dom";
import NotificationContext from "../../store/toast";

const LoginForm = () => {
    const data = useActionData();
    const notifCtx = useContext(NotificationContext);

    if (data && data.message) {
        notifCtx.onNotify(data.message);
        data.message = "";
    }

    return (
        <>
            <Form method="post">
                <div className="space-y-5 mb-8">
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
                </div>

                <button className="btn w-full mb-3">Sign in</button>
                <p className="text-center">
                    Don't have an account?{" "}
                    <Link className="link" to="/signup">
                        Sign up
                    </Link>
                </p>
            </Form>
        </>
    );
};

export default LoginForm;

export const action = async ({ request }) => {
    const data = await request.formData();

    const userCredentials = {
        username: data.get("username"),
        password: data.get("password"),
    };

    const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify(userCredentials),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 401) {
        return response;
    }

    if (!response.ok) {
        const error = await response.json();
        throw json({ message: error.message }, { status: response.status });
    }

    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
};
