import React, { useEffect } from "react";
import NavBar from "../components/Auth/NavBar";
import {
    Outlet,
    useLoaderData,
    useSubmit,
    useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenDuration } from "../util/auth";

const Root = () => {
    const submit = useSubmit();
    const token = useLoaderData();
    const location = useLocation();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            submit(null, { action: "/logout", method: "POST" });
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, { action: "/logout", method: "post" });
        }, tokenDuration);
    }, [token, submit]);

    return (
        <>
            <header
                className={`${
                    location.pathname === "/quizzes"
                        ? ""
                        : "md:border-b-[1px] md:border-b-brown md:border-opacity-50 md:mb-5"
                } container`}
            >
                <NavBar />
            </header>

            <main>
                <Outlet />
                <ToastContainer />
            </main>
        </>
    );
};

export default Root;
