import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Spinner from "./components/UI/Spinner";

import { tokenLoader, authChecker } from "./util/auth";
import { action as authAction } from "./pages/AuthPage";
import { createQuizAction } from "./pages/Quiz/CreateQuizPage";
import { editQuizAction } from "./pages/Quiz/EditQuizPage";
import { checkQuizResults } from "./pages/Quiz/TestPage";

const LandingPage = lazy(() => import("./pages/LandingPage"));
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
                element: <LandingPage />,
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
                        path: "/home",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <HomePage />
                            </Suspense>
                        ),
                        loader: ({ request }) =>
                            import("./pages/HomePage").then((module) =>
                                module.homeDataLoader({ request })
                            ),
                    },
                    {
                        path: "quiz/:displayId",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <QuizDetailPage />
                            </Suspense>
                        ),
                        loader: ({ params }) =>
                            import("./pages/Quiz/QuizDetailPage").then(
                                (module) => module.quizDetailLoader({ params })
                            ),
                    },
                    {
                        path: "quiz/:displayId/edit",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <EditQuizPage />
                            </Suspense>
                        ),
                        loader: ({ params }) =>
                            import("./pages/Quiz/QuizDetailPage").then(
                                (module) => module.quizDetailLoader({ params })
                            ),
                        action: editQuizAction,
                    },
                    {
                        path: "quiz/:displayId/question/:questionId/edit",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <EditQuestionPage />
                            </Suspense>
                        ),
                        loader: ({ params }) =>
                            import("./pages/Quiz/EditQuestionPage").then(
                                (module) => module.questionLoader({ params })
                            ),
                    },
                    {
                        path: "quiz/:displayId/attempt_history",
                        element: (
                            <Suspense fallback={<Spinner />}>
                                <AttemptHistoryPage />
                            </Suspense>
                        ),
                        loader: ({ params }) =>
                            import("./pages/Quiz/AttemptHistoryPage").then(
                                (module) =>
                                    module.attemptHistoryLoader({ params })
                            ),
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
                loader: ({ params }) =>
                    import("./pages/Quiz/FlashcardsPage").then((module) =>
                        module.publicQuizDetailLoader({ params })
                    ),
            },
            {
                path: "quiz/:displayId/test",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <TestPage />
                    </Suspense>
                ),
                loader: ({ params }) =>
                    import("./pages/Quiz/FlashcardsPage").then((module) =>
                        module.publicQuizDetailLoader({ params })
                    ),
                action: checkQuizResults,
            },
            {
                path: "result/:attemptId",
                element: (
                    <Suspense fallback={<Spinner />}>
                        <QuizResultsPage />
                    </Suspense>
                ),
                loader: ({ params }) =>
                    import("./pages/Quiz/QuizResultsPage").then((module) =>
                        module.resultsLoader({ params })
                    ),
            },
        ],
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
