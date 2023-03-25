import React, { useEffect } from "react";
import NavBar from "../components/Auth/NavBar";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenDuration } from "../util/auth";

const Root = () => {
    const submit = useSubmit();
    const token = useLoaderData();

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
            <header>
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
