const TrueOrFalse = ({ answerHandler, correctAnswer }) => {
    return (
        <div className="space-y-3">
            <p className="font-semibold">Correct Answer</p>
            <ul className="space-y-1">
                <li>
                    <input
                        type="radio"
                        className="radio-btn"
                        value="true"
                        onChange={answerHandler}
                        defaultChecked={correctAnswer === true}
                        name="true or false"
                    />
                    <label htmlFor="true">True</label>
                </li>
                <li>
                    <input
                        type="radio"
                        value="false"
                        className="radio-btn"
                        onChange={answerHandler}
                        defaultChecked={correctAnswer === false}
                        name="true or false"
                    />
                    <label htmlFor="false">False</label>
                </li>
            </ul>
        </div>
    );
};

export default TrueOrFalse;
