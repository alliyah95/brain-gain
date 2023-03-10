import React from "react";
import LoginForm from "../components/Auth/LoginForm";

const Auth = () => {
    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <div className="text-center lg:text-start mb-9">
                    <h2 className="text-brown text-4xl md:text-5xl font-bold mb-2">
                        Log in
                    </h2>
                    <p>Welcome back! Please enter your details.</p>
                </div>

                <LoginForm />
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
