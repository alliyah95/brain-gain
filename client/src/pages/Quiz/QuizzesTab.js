import Card from "../../components/UI/Card";

const QuizzesTab = ({ quizSets }) => {
    return (
        <div>
            {quizSets.length === 0 && (
                <p className="italic">You don't have any quiz sets yet.</p>
            )}
            {quizSets && (
                <ul className="preview-card-container">
                    {quizSets.map((quiz) => {
                        return (
                            <li key={quiz.id}>
                                <Card
                                    path={`/quiz/${quiz.displayId}`}
                                    title={quiz.title}
                                    description={quiz.description}
                                    hasTag={true}
                                    tagContent={`${quiz.numQuestions} questions`}
                                    noDescPrompt={false}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default QuizzesTab;
