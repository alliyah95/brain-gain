import { redirect } from "react-router-dom";

export const getTokenDuration = () => {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
};

export const getAuthToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return "EXPIRED";
    }

    return token;
};

export const tokenLoader = () => {
    return getAuthToken();
};

export const authChecker = () => {
    if (!getAuthToken()) {
        return redirect("/login");
    }

    return null;
};

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
    window.location.href = "/login";
};
