import { Form, Link } from "react-router-dom";

const LoginForm = () => {
    return (
        <>
            <Form method="post">
                <div className="space-y-4 mb-8">
                    <input
                        type="text"
                        className="line-input"
                        placeholder="alliyah95"
                        name="username"
                        required
                    />
                    <label>Username</label>
                    <input
                        type="password"
                        className="line-input"
                        placeholder="••••••••"
                        name="password"
                        required
                    />
                    <label>Password</label>
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
