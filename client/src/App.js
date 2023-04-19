import { lazy, Suspense } from "react";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Spinner from "./components/UI/Spinner";
import { action as authAction } from "./pages/AuthPage";
import { tokenLoader, authChecker } from "./util/auth";
import { createQuizAction } from "./pages/Quiz/CreateQuizPage";
import { quizDetailLoader } from "./pages/Quiz/QuizDetailPage";
import { editQuizAction } from "./pages/Quiz/EditQuizPage";
import { questionLoader } from "./pages/Quiz/EditQuestionPage";
import { publicQuizDetailLoader } from "./pages/Quiz/FlashcardsPage";
import { checkQuizResults } from "./pages/Quiz/TestPage";
import { resultsLoader } from "./pages/Quiz/QuizResultsPage";
import { attemptHistoryLoader } from "./pages/Quiz/AttemptHistoryPage";
import { homeDataLoader } from "./pages/HomePage";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const CreateQuizPage = lazy(() => import("./pages/Quiz/CreateQuizPage"));
const EditQuizPage = lazy(() => import("./pages/Quiz/EditQuizPage"));
const QuizDetailPage = lazy(() => import("./pages/Quiz/QuizDetailPage"));
const EditQuestionPage = lazy(() => import("./pages/Quiz/EditQuestionPage"));
const FlashcardsPage = lazy(() => import("./pages/Quiz/FlashcardsPage"));
const TestPage = lazy(() => import("./pages/Quiz/TestPage"));
const QuizResultsPage = lazy(() => import("./pages/Quiz/QuizResultsPage"));
const AttemptHistoryPage = lazy(() =>
    import("./pages/Quiz/AttemptHistoryPage")
);

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
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AuthPage />
                    </Suspense>
                ),
                action: authAction,
            },
            {
                path: "/signup",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <AuthPage />
                    </Suspense>
                ),
                action: authAction,
            },
            {
                path: "/",
                loader: authChecker,
                errorElement: <ErrorPage noNavBar={true} />,
                children: [
                    {
                        path: "create_quiz",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <CreateQuizPage />
                            </Suspense>
                        ),
                        action: createQuizAction,
                    },
                    {
                        index: true,
                        path: "/home",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <HomePage />
                            </Suspense>
                        ),
                        loader: homeDataLoader,
                    },
                    {
                        path: "quiz/:displayId",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <QuizDetailPage />
                            </Suspense>
                        ),
                        loader: quizDetailLoader,
                    },
                    {
                        path: "quiz/:displayId/edit",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <EditQuizPage />
                            </Suspense>
                        ),
                        loader: quizDetailLoader,
                        action: editQuizAction,
                    },
                    {
                        path: "quiz/:displayId/question/:questionId/edit",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <EditQuestionPage />
                            </Suspense>
                        ),
                        loader: questionLoader,
                    },
                    {
                        path: "quiz/:displayId/attempt_history",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <AttemptHistoryPage />
                            </Suspense>
                        ),
                        loader: attemptHistoryLoader,
                    },
                ],
            },
            {
                path: "quiz/:displayId/flashcards",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <FlashcardsPage />
                    </Suspense>
                ),
                loader: publicQuizDetailLoader,
            },
            {
                path: "quiz/:displayId/test",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <TestPage />
                    </Suspense>
                ),
                loader: publicQuizDetailLoader,
                action: checkQuizResults,
            },
            {
                path: "quiz/result/:attemptId",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <QuizResultsPage />
                    </Suspense>
                ),
                loader: resultsLoader,
            },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
