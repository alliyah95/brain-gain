import { Link, json, useLoaderData, useLocation } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { PlusIcon } from "@heroicons/react/24/solid";
import useMedia from "../hooks/useMedia";
import { QuizzesTab, MyActivityTab } from "./Quiz";

const HomePage = () => {
    const location = useLocation();
    const data = useLoaderData();
    const queryParams = new URLSearchParams(location.search);
    const tabValue = queryParams.get("tab");
    const { isSmallScreen } = useMedia();

    let tabContent = <QuizzesTab quizSets={data} />;

    if (tabValue === "my_activity") {
        tabContent = (
            <MyActivityTab
                attemptHistory={data.attemptHistory}
                currentUser={data.currentUser}
            />
        );
    }

    return (
        <div className="md:px-5 xl:px-8 h-full">
            <div className="flex flex-row items-center border-b-[1px] border-b-brown py-2 mb-4 ">
                <ul className="font-bold flex gap-3">
                    <li>
                        <Link
                            className={
                                tabValue === "my_activity" ||
                                tabValue === "library"
                                    ? "opacity-50"
                                    : ""
                            }
                            to="/home?tab=quizzes"
                        >
                            My Quiz Sets
                        </Link>
                    </li>
                    <li
                        className={
                            tabValue !== "my_activity" ? "opacity-50" : ""
                        }
                    >
                        <Link to="/home?tab=my_activity">My Activity</Link>
                    </li>
                </ul>
                {isSmallScreen && (
                    <Link
                        to="/create_quiz"
                        className="btn px-4 py-1 inline-flex items-center gap-x-2 ml-auto"
                    >
                        <PlusIcon className="h-3.5 w-3.5 text-light-brown fill-none stroke-current stroke-2" />
                        New quiz
                    </Link>
                )}
            </div>

            {tabContent}
        </div>
    );
};

export default HomePage;

export const homeDataLoader = async ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get("tab");
    const token = getAuthToken();

    const ENDPOINTS = {
        quizzes: "quiz_sets",
        my_activity: "get_attempts_by_user",
    };

    const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API}${ENDPOINTS[tab] || "quiz_sets"}`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (response.status === 404 || response.status === 401) {
        throw response;
    }

    if (!response.ok) {
        throw json({ message: "Could not fetch data" }, { status: 500 });
    }
    const data = await response.json();

    if (!tab || ENDPOINTS[tab] === "quiz_sets") {
        return data.filteredQuizSets;
    } else if (tab === "my_activity") {
        return data.data;
    }

    return data.filteredQuizSets;
};
