import { Link, Form } from "react-router-dom";

const RegistrationForm = () => {
    return (
        <Form action="" method="post">
            <div className="space-y-4 mb-8">
                <input
                    type="text"
                    className="line-input"
                    placeholder="Alliyah joyce"
                    name="name"
                    required
                />
                <label>Name</label>
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
                <input
                    type="password"
                    className="line-input"
                    placeholder="••••••••"
                    name="confirmedPassword"
                    required
                />
                <label>Confirm password</label>
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
