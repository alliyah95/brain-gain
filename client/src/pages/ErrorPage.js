import { Link, useRouteError, useNavigate } from "react-router-dom";
import ParticlesBackground from "../components/UI/ParticlesBackground";
import NavBar from "../components/UI/NavBar";
import Footer from "../components/UI/Footer";
import { getAuthToken } from "../util/auth";

const ErrorPage = () => {
    const error = useRouteError();
    const token = getAuthToken();
    const navigate = useNavigate();

    let title = "An error occured!";
    let message = "It's not you, it's us. Or maybe, it's also partly you...";

    if (error.status === 500) {
        title = "Internal server error";
        message =
            "Our server seems to be taking a quiz of its own. We'll be back shortly.";
    }

    if (error.status === 404) {
        title = "Page not found";
        message =
            "The page is missing, but we promise to find it and send it home to you.";
    }

    const navigationHandler = () => {
        navigate(-1);
    };

    return (
        <>
            <ParticlesBackground>
                <header>
                    <NavBar tokenProp={token} />
                </header>
                <main>
                    <div className="text-center my-20 px-4">
                        <p className="text-3xl lg:text-4xl font-bold mb-1">
                            {title}
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
