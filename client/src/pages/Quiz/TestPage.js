import {
    useLoaderData,
    Link,
    Form,
    useParams,
    json,
    redirect,
} from "react-router-dom";
import QuestionCard from "../../components/Question/QuestionCard";
import { getAuthToken } from "../../util/auth";

const TestPage = () => {
    const quizData = useLoaderData();
    const { displayId } = useParams();

    return (
        <div className="max-w-[1200px] mx-auto">
            <p className="text-center font-bold text-2xl">{quizData.title}</p>
            <p className="text-center text-yellow ">
                {quizData.questions.length} questions
            </p>

            <Form method="post">
                {quizData.questions.length > 0 && (
                    <ul className="mt-8 space-y-5 md:space-y-8">
                        {quizData.questions.map((question, index) => {
                            return (
                                <li key={question._id}>
                                    <QuestionCard
                                        index={index}
                                        key={question._id}
                                        data={question}
                                        name={`question${index}`}
                                        disabled={false}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}

                <button className="btn">Submit Quiz</button>
            </Form>

            {quizData.questions.length === 0 && (
                <div className="text-center my-20 px-4">
                    <p className="text-2xl lg:text-3xl font-bold mb-5">
                        Oops! This quiz does not have any questions yet
                    </p>
                    <Link className="btn" to={`/quiz/${displayId}`}>
                        Add questions
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TestPage;

export const checkQuizResults = async ({ request, params }) => {
    const data = Object.fromEntries(await request.formData());
    const answers = {};
    const token = getAuthToken();
    const displayId = params.displayId;

    for (const key in data) {
        const index = key.match(/\d+/)[0];
        answers[index] = data[key];
    }

    const response = await fetch(
        `http://localhost:8080/api/check_quiz/${displayId}`,
        {
            method: "POST",
            body: JSON.stringify(answers),
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        }
    );

    if (!response.ok) {
        throw json(
            {
                message:
                    "There has been an internal server error. We'll try to fix it ASAP...",
            },
            { status: 500 }
        );
    }

    const resData = await response.json();
    return redirect(
        `/quiz/${resData.displayId}/result/${resData.attemptHistory._id}`
    );
};
