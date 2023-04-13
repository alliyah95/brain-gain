import { useRouteError, useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/UI/ParticlesBackground";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { getAuthToken } from "../util/auth";

const ErrorPage = ({ noNavBar }) => {
    const error = useRouteError();
    const token = getAuthToken();
    const navigate = useNavigate();

    let message = "";
    if (error instanceof TypeError) {
        message =
            "There has been an internal server error. We'll try to fix it ASAP...";
    } else if (error.status === 404 && error.data.includes("route")) {
        message = "Page not found.";
    }

    if (error.data && error.data.message) {
        message = error.data.message;
    }

    const navigationHandler = () => {
        navigate(-1);
    };

    return (
        <>
            <ParticlesBackground>
                {!noNavBar && (
                    <header>
                        <NavBar tokenProp={token} />
                    </header>
                )}

                <main>
                    <div className="text-center my-20 px-4">
                        <p className="text-3xl lg:text-4xl font-bold mb-1">
                            An error occured!
                        </p>
                        <p className="text-base mb-4">{message}</p>
                        <button className="btn" onClick={navigationHandler}>
                            Go back
                        </button>
                    </div>
                </main>
                <Footer />
            </ParticlesBackground>
        </>
    );
};

export default ErrorPage;
