import React, { useEffect } from "react";
import ParticlesBackground from "../components/UI/ParticlesBackground";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
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
        <ParticlesBackground>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
                <ToastContainer
                    icon={false}
                    hideProgressBar={true}
                    autoClose={2500}
                    pauseOnFocusLoss={false}
                    position="bottom-right"
                />
            </main>
            <Footer />
        </ParticlesBackground>
    );
};

export default Root;
