import React, { useEffect, useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "../util/particles.json";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenDuration } from "../util/auth";

const Root = () => {
    const submit = useSubmit();
    const token = useLoaderData();
    const particlesInit = useCallback((main) => {
        loadFull(main);
    }, []);

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
            <Particles options={particlesOptions} init={particlesInit} />
            <header>
                <NavBar />
            </header>

            <main>
                <Outlet />
                <ToastContainer />
            </main>

            <Footer />
        </>
    );
};

export default Root;
