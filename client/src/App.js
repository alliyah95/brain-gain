import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import CreateQuizPage from "./pages/Quiz/CreateQuizPage";
import QuizzesPage from "./pages/Quiz/QuizzesPage";
import { action as loginAction } from "./components/Auth/LoginForm";
import { action as registerAction } from "./components/Auth/RegistrationForm";
import { tokenLoader, authChecker } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import { action as createQuizAction } from "./components/Quiz/CreateQuizForm";
import AuthenticationPage from "./pages/Auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <Home />,
                loader: authChecker,
            },
            {
                path: "/login",
                element: <AuthenticationPage />,
                action: loginAction,
            },
            {
                path: "/signup",
                element: <AuthenticationPage />,
                action: registerAction,
            },
            {
                path: "logout",
                action: logoutAction,
                loader: authChecker,
            },
            {
                path: "/",
                loader: authChecker,
                children: [
                    {
                        path: "create_quiz",
                        element: <CreateQuizPage />,
                        action: createQuizAction,
                    },
                    {
                        path: "home",
                        element: <QuizzesPage />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
