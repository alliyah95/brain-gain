import React, { useState, useEffect } from "react";
import { Form, Link, useLocation, useRouteLoaderData } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const [path, setPath] = useState();
    const [btnName, setBtnName] = useState();
    const token = useRouteLoaderData("root");

    useEffect(() => {
        if (location.pathname === "/login") {
            setPath("/signup");
            setBtnName("Sign up");
        } else {
            setPath("/login");
            setBtnName("Sign in");
        }
    }, [location.pathname]);

    return (
        <nav>
            <h2>
                <span className="text-yellow">brain</span>
                <span className="text-brown">gain</span>
            </h2>

            {!token && (
                <Link className="btn" to={path}>
                    {btnName}
                </Link>
            )}

            {token && (
                <Form action="/logout" method="POST">
                    <button className="btn">Logout</button>
                </Form>
            )}
        </nav>
    );
};

export default NavBar;
