import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Auth /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
