import { Link, Form, json, redirect } from "react-router-dom";

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

export const action = async ({ request, params }) => {
    const data = await request.formData();

    const newUserdata = {
        name: data.get("name"),
        username: data.get("username"),
        password: data.get("password"),
        confirmedPassword: data.get("confirmedPassword"),
    };

    const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: JSON.stringify(newUserdata),
        headers: { "Content-Type": "application/json" },
    });

    if (response.status === 400) {
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
