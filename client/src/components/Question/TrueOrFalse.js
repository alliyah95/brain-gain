const TrueOrFalse = ({ answerHandler }) => {
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
                    />
                    <label htmlFor="true">True</label>
                </li>
                <li>
                    <input
                        type="radio"
                        value="false"
                        className="radio-btn"
                        onChange={answerHandler}
                    />
                    <label htmlFor="false">False</label>
                </li>
            </ul>
        </div>
    );
};

export default TrueOrFalse;
