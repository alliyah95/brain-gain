import React, { useEffect, useState } from "react";
import {
    useLocation,
    useRouteLoaderData,
    useNavigate,
    useActionData,
    json,
    redirect,
} from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegistrationForm from "../components/Auth/RegistrationForm";
import { customToast } from "../util/customToast";

const AuthPage = () => {
    const location = useLocation();
    const token = useRouteLoaderData("root");
    const navigate = useNavigate();
    const [render, setRender] = useState(false);
    const error = useActionData();

    useEffect(() => {
        if (token) {
            setRender(false);
            navigate("/");
        } else {
            setRender(true);
        }
    }, [token, navigate]);

    if (!render) {
        return <></>;
    }

    if (error && error.message) {
        customToast("error", error.message);
        error.message = "";
    }

    const [form, header, subtitle] =
        location.pathname === "/login"
            ? [
                  <LoginForm />,
                  "Log in",
                  "Welcome back! Please enter your details.",
              ]
            : [
                  <RegistrationForm />,
                  "Sign up",
                  "Please provide the needed information.",
              ];

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <div className="text-center lg:text-start mb-9">
                    <h2 className="text-brown text-4xl md:text-5xl font-bold mb-2">
                        {header}
                    </h2>
                    <p>{subtitle}</p>
                </div>
                {form}
            </div>
            <div className="lg:w-[50%]">
                <img
                    src="/assets/landing.png"
                    alt="Illustration"
                    className="w-[350px] md:w-[400px] xl:w-[500px] mx-auto"
                />
            </div>
        </div>
    );
};

export default AuthPage;

export const action = async ({ request }) => {
    const data = await request.formData();
    const action = request.url.includes("login") ? "login" : "register";
    let userCredentials = {};

    if (action === "login") {
        userCredentials.username = data.get("username");
        userCredentials.password = data.get("password");
    }

    if (action === "register") {
        userCredentials.name = data.get("name");
        userCredentials.username = data.get("username");
        userCredentials.password = data.get("password");
        userCredentials.confirmedPassword = data.get("confirmedPassword");
    }

    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}${action}`,
        {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: { "Content-Type": "application/json" },
        }
    );

    if (response.status === 400 || response.status === 401) {
        return response;
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

    const resData = await response.json();
    const token = resData.token;
    const user = resData.user;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 168);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
};
