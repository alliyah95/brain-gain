const TrueOrFalse = ({ answerHandler, correctAnswer }) => {
    return (
        <div className="space-y-3">
            <p className="font-semibold mt-4">Correct Answer</p>
            <ul className="space-y-1 ">
                <li className="flex items-center">
                    <input
                        id="true"
                        type="radio"
                        className="radio-btn"
                        value="true"
                        onChange={answerHandler}
                        defaultChecked={correctAnswer === true}
                        name="true or false"
                    />
                    <label
                        htmlFor="true"
                        className="font-normal cursor-pointer"
                    >
                        True
                    </label>
                </li>
                <li className="flex items-center">
                    <input
                        id="false"
                        type="radio"
                        value="false"
                        className="radio-btn"
                        onChange={answerHandler}
                        defaultChecked={correctAnswer === false}
                        name="true or false"
                    />
                    <label
                        htmlFor="false"
                        className="font-normal cursor-pointer"
                    >
                        False
                    </label>
                </li>
            </ul>
        </div>
    );
};

export default TrueOrFalse;
