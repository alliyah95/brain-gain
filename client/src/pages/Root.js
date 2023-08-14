import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenDuration } from "../util/auth";
import { logoutUser } from "../util/auth";
import { Spinner, ParticlesBackground, NavBar, Footer } from "../components";

const Root = () => {
    const token = useLoaderData();
    const navigation = useNavigation();

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
                {navigation.state === "submitting" && <Spinner />}
                {navigation.state === "loading" && <Spinner />}
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
