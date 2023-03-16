import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/Auth";
import { action as loginAction } from "./components/Auth/LoginForm";
import { action as registerAction } from "./components/Auth/RegistrationForm";
import { tokenLoader, authChecker } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: tokenLoader,
        children: [
            { index: true, element: <Home />, loader: authChecker },
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
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
