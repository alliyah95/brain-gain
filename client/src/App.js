import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import CreateQuizPage from "./pages/Quiz/CreateQuizPage";
import AuthenticationPage, { action as authAction } from "./pages/Auth";
import { tokenLoader, authChecker } from "./util/auth";
import { createQuizAction } from "./pages/Quiz/CreateQuizPage";
import QuizDetailPage, { quizDetailLoader } from "./pages/Quiz/QuizDetailPage";
import EditQuizPage, { editQuizAction } from "./pages/Quiz/EditQuizPage";
import EditQuestionPage, {
    questionLoader,
} from "./pages/Quiz/EditQuestionPage";
import FlashCardsPage, {
    publicQuizDetailLoader,
} from "./pages/Quiz/FlashCardsPage";
import TestPage, { checkQuizResults } from "./pages/Quiz/TestPage";
import QuizResultsPage, { resultsLoader } from "./pages/Quiz/QuizResultsPage";
import AttemptHistoryPage, {
    attemptHistoryLoader,
} from "./pages/Quiz/AttemptHistoryPage";
import HomePage, { homeDataLoader } from "./pages/HomePage";

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
                loader: () => {
                    return redirect("/home");
                },
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
                        index: true,
                        path: "/home",
                        element: <HomePage />,
                        loader: homeDataLoader,
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
                    {
                        path: "quiz/:displayId/attempt_history",
                        element: <AttemptHistoryPage />,
                        loader: attemptHistoryLoader,
                    },
                ],
            },
            {
                path: "quiz/:displayId/flashcards",
                element: <FlashCardsPage />,
                loader: publicQuizDetailLoader,
            },
            {
                path: "quiz/:displayId/test",
                element: <TestPage />,
                loader: publicQuizDetailLoader,
                action: checkQuizResults,
            },
            {
                path: "quiz/result/:attemptId",
                element: <QuizResultsPage />,
                loader: resultsLoader,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
