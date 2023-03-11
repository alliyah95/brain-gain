import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import AuthenticationPage from "./pages/Auth";
import { action as loginAction } from "./components/Auth/LoginForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            {
                path: "/login",
                element: <AuthenticationPage />,
                action: loginAction,
            },
            { path: "/signup", element: <AuthenticationPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
