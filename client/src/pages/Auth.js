import React from "react";
import { useLocation, redirect } from "react-router-dom";
import { tokenLoader } from "../util/auth";
import LoginForm from "../components/Auth/LoginForm";
import RegistrationForm from "../components/Auth/RegistrationForm";

const AuthenticationPage = () => {
    const location = useLocation();

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

export const authLoader = () => {
    const tokenInStorage = tokenLoader();

    if (tokenInStorage !== null || tokenInStorage !== "EXPIRED") {
        return redirect("/");
    }

    return null;
};

export default AuthenticationPage;
