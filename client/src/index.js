import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NotificationContextProvider } from "./store/toast";
import { UserContextProvider } from "./store/user";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <UserContextProvider>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </UserContextProvider>
    </>
);
