import React from "react";

const Login = () => {
    return (
        <form action="">
            <div className="space-y-5 mb-8">
                <input
                    type="text"
                    className="line-input"
                    placeholder="Username"
                />
                <input
                    type="password"
                    className="line-input"
                    placeholder="Password"
                />
            </div>

            <button className="btn w-full mb-3">Sign in</button>
            <p className="text-center">
                Don't have an account?{" "}
                <a className="link" href="/signup">
                    Sign up
                </a>
            </p>
        </form>
    );
};

export default Login;
