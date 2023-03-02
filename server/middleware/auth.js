const jwt = require("jsonwebtoken");
const QuizSet = require("../models/Quiz/QuizSet");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Please log in to continue" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.id;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Please log in to continue" });
    }
};

const isQuizOwner = async (req, res, next) => {
    const quizId = req.params.quizId;
    const quiz = await QuizSet.findById(quizId);

    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found!" });
    }

    if (quiz.createdBy.toString() !== req.user) {
        return res
            .status(401)
            .json({ message: "Not authorized to access this quiz" });
    }

    next();
};
module.exports = { isLoggedIn, isQuizOwner };
