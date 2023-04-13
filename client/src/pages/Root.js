import React, { useEffect } from "react";
import ParticlesBackground from "../components/UI/ParticlesBackground";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { Outlet, useLoaderData } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenDuration } from "../util/auth";
import { logoutUser } from "../util/auth";

const Root = () => {
    const token = useLoaderData();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            logoutUser();
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            logoutUser();
        }, tokenDuration);
    }, [token]);

    return (
        <ParticlesBackground>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
                <ToastContainer
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
