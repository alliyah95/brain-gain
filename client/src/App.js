import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/Auth";
import { action as loginAction } from "./components/Auth/LoginForm";
import { action as registerAction } from "./components/Auth/RegistrationForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
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
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
