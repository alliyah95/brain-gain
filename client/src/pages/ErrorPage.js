import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="text-center">
            <p className="text-4xl font-bold">Oops! Something went wrong!</p>
            <Link to="/login" className="link">
                Go back
            </Link>
        </div>
    );
};

export default ErrorPage;
