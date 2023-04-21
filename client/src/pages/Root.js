import React, { useEffect } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTokenDuration } from "../util/auth";
import { logoutUser } from "../util/auth";
import Spinner from "../components/UI/Spinner";
import ParticlesBackground from "../components/UI/ParticlesBackground";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";

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
