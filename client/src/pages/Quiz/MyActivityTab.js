import { Link } from "react-router-dom";

const MyActivityTab = ({ attemptHistory, currentUser }) => {
    return (
        <div>
            {attemptHistory.length === 0 && (
                <p className="italic">You have not taken any quiz sets yet.</p>
            )}
            {attemptHistory && (
                <ul className="my-8 preview-card-container">
                    {attemptHistory.map((attempt) => {
                        return (
                            <li key={attempt.id}>
                                <Link to={`/quiz/result/${attempt.id}`}>
                                    <div className="preview-card">
                                        <p className="tag bg-yellow text-white">
                                            {currentUser !==
                                            attempt.quizSetCreator
                                                ? "others"
                                                : "own quiz"}
                                        </p>
                                        <p className="font-semibold">
                                            {attempt.quizTitle}
                                        </p>
                                        <p className="text-muted-brown">
                                            Score: {attempt.score}/
                                            {attempt.totalScore}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MyActivityTab;
