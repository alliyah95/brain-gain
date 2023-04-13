import { Link } from "react-router-dom";

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
                                <Link to={`/quiz/${quiz.displayId}`}>
                                    <div className="preview-card">
                                        <p className="tag bg-yellow text-white">
                                            {quiz.numQuestions} questions
                                        </p>
                                        <p className="font-semibold">
                                            {quiz.title}
                                        </p>
                                        {quiz.description && (
                                            <p>{quiz.description}</p>
                                        )}
                                        {!quiz.description && (
                                            <p className="text-brown text-opacity-50">
                                                No description
                                            </p>
                                        )}
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

export default QuizzesTab;
