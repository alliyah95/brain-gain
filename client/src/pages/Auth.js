import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegistrationForm from "../components/Auth/RegistrationForm";

const Auth = () => {
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

export default Auth;
