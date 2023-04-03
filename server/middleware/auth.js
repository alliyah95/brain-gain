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

const isQuizOwner = asyncHandler(async (req, res, next) => {
    const { quizDisplayId } = req.params;

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId });
    if (!quiz) {
        return res.status(404).json({ message: "This quiz does not exist!" });
    }

    if (quiz.createdBy.toString() !== req.user) {
        return res
            .status(401)
            .json({ message: "You are unauthorized to access this quiz" });
    }

    next();
});

module.exports = { isLoggedIn, isQuizOwner };
