const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
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

const isAlreadyLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return next();
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.user);
        if (!user) {
            return next();
        }

        return res.status(401).json({ message: "You are already logged in!" });
    } catch (err) {
        console.log(err);
        return next();
    }
};

const isQuizOwner = asyncHandler(async (req, res, next) => {
    const { quizId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(quizId)) {
        return res.status(400).json({ message: "Invalid quiz ID" });
    }

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
});

module.exports = { isLoggedIn, isAlreadyLoggedIn, isQuizOwner };
