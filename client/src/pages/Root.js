import React from "react";
import NavBar from "../components/Auth/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Root = () => {
    return (
        <>
            <header className="container">
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
