import { Link, Form } from "react-router-dom";

const RegistrationForm = () => {
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
