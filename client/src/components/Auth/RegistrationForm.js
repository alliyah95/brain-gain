import React from "react";

const RegistrationForm = () => {
    return (
        <form action="">
            <div className="space-y-5 mb-8">
                <input
                    type="text"
                    className="line-input"
                    placeholder="Name"
                    name="name"
                />
                <input
                    type="email"
                    className="line-input"
                    placeholder="Email"
                    name="email"
                />
                <input
                    type="text"
                    className="line-input"
                    placeholder="Username"
                    name="username"
                />
                <input
                    type="password"
                    className="line-input"
                    placeholder="Password"
                />
            </div>

            <button className="btn w-full mb-3">Create account</button>
            <p className="text-center">
                Already have an account?
                <a className="link" href="/login">
                    {" "}
                    Sign in
                </a>
            </p>
        </form>
    );
};

export default RegistrationForm;
