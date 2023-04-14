import Card from "../../components/UI/Card";

const MyActivityTab = ({ attemptHistory, currentUser }) => {
    return (
        <div>
            {attemptHistory.length === 0 && (
                <p className="italic">You have not taken any quiz sets yet.</p>
            )}
            {attemptHistory && (
                <ul className="preview-card-container">
                    {attemptHistory.map((attempt) => {
                        return (
                            <li key={attempt.id}>
                                <Card
                                    path={`/quiz/result/${attempt.id}`}
                                    title={attempt.quizTitle}
                                    description={`Score: ${attempt.score}/${attempt.totalScore}`}
                                    hasTag={true}
                                    tagContent={
                                        currentUser !== attempt.quizSetCreator
                                            ? "others"
                                            : "own quiz"
                                    }
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default MyActivityTab;
