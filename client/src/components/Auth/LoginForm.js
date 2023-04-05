import { Form, Link } from "react-router-dom";

const LoginForm = () => {
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
