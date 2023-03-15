import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const [path, setPath] = useState();
    const [btnName, setBtnName] = useState();

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

            <Link className="btn" to={path}>
                {btnName}
            </Link>
        </nav>
    );
};

export default NavBar;
