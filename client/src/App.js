import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import CreateQuizPage from "./pages/Quiz/CreateQuizPage";
import AuthenticationPage, { action as authAction } from "./pages/Auth";
import QuizzesPage, { loader as quizzesLoader } from "./pages/Quiz/QuizzesPage";
import { tokenLoader, authChecker } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import { action as createQuizAction } from "./pages/Quiz/CreateQuizPage";
import QuizDetailPage, {
    loader as quizDetailLoader,
} from "./pages/Quiz/QuizDetailPage";
import EditQuizPage, {
    action as editQuizAction,
} from "./pages/Quiz/EditQuizPage";
import EditQuestionPage, {
    loader as questionLoader,
} from "./pages/Quiz/EditQuestionPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage noNavBar={false} />,
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
                action: authAction,
            },
            {
                path: "/signup",
                element: <AuthenticationPage />,
                action: authAction,
            },
            {
                path: "logout",
                action: logoutAction,
                loader: authChecker,
            },
            {
                path: "/",
                loader: authChecker,
                errorElement: <ErrorPage noNavBar={true} />,
                children: [
                    {
                        path: "create_quiz",
                        element: <CreateQuizPage />,
                        action: createQuizAction,
                    },
                    {
                        path: "quizzes",
                        element: <QuizzesPage />,
                        loader: quizzesLoader,
                    },
                    {
                        path: "quiz/:displayId",
                        element: <QuizDetailPage />,
                    },
                    {
                        path: "quiz/:displayId/edit",
                        element: <EditQuizPage />,
                        loader: quizDetailLoader,
                        action: editQuizAction,
                    },
                    {
                        path: "quiz/:displayId/question/:questionId/edit",
                        element: <EditQuestionPage />,
                        loader: questionLoader,
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
