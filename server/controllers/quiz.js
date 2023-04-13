const QuizSet = require("../models/Quiz/QuizSet");
const Question = require("../models/Quiz/Question");
const AttemptHistory = require("../models/Quiz/AttemptHistory");
const User = require("../models/User");
const validators = require("../utils/validators");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const {
    filteredAttemptHistory,
    filterAttemptHistory,
} = require("../utils/quiz");

const createQuiz = asyncHandler(async (req, res) => {
    const creator = req.user;
    const { title, isPublic } = req.body;
    let { description } = req.body;

    const validationError = validators.validateQuiz({ title, creator });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const user = await User.findById(creator);

    if (!description) {
        description = "";
    }

    const newQuizSet = await QuizSet({
        title,
        description,
        createdBy: creator,
        creatorUsername: user.username,
        questions: [],
        attempts: [],
        isPublic: Boolean(isPublic),
    });

    await newQuizSet.save();
    res.status(201).json({
        message: "Quiz successfully created!",
        quiz: newQuizSet,
    });
});

const updateQuiz = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;
    const { title, description, isPublic } = req.body;

    const validationError = validators.validateQuizUpdateValues({
        quizDisplayId,
        title,
    });

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId });
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    const updatedFields = {};
    if (title) {
        updatedFields.title = title;
    }

    if (description || description === "") {
        updatedFields.description = description;
    }

    updatedFields.isPublic = isPublic;

    const updatedQuiz = await QuizSet.findOneAndUpdate(
        { _id: quiz.id },
        { $set: updatedFields },
        { new: true }
    );

    res.status(200).json({
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
    });
});

const getQuizzes = asyncHandler(async (req, res) => {
    const user = req.user;
    const quizSets = await QuizSet.find({
        createdBy: user,
    });

    let filteredQuizSets = [];
    if (quizSets) {
        filteredQuizSets = quizSets.map((quiz) => {
            const numQuestions = quiz.questions.length;
            return {
                id: quiz.id,
                displayId: quiz.displayId,
                title: quiz.title,
                description: quiz.description,
                numQuestions,
            };
        });
    }

    res.status(201).json({ filteredQuizSets });
});

const getQuiz = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId }).populate(
        "questions"
    );

    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz successfully retrieved", quiz });
});

const getPublicQuiz = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId }).populate(
        "questions"
    );

    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    if (!quiz.flashcardsPublic) {
        if (quiz.createdBy.toString() !== req.user) {
            return res
                .status(401)
                .json({ message: "You are unauthorized to access this quiz" });
        }
    }

    res.status(200).json({ message: "Quiz successfully retrieved", quiz });
});

const deleteQuiz = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId });
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    const deletedQuiz = await QuizSet.findOneAndDelete({
        displayId: quizDisplayId,
    });
    if (!deletedQuiz) {
        return res.status(500).json({ message: "Failed to delete quiz" });
    }

    await Question.deleteMany({ quizSet: quiz.id });
    await AttemptHistory.deleteMany({ quizSet: quiz.id });

    res.status(201).json({ message: "Quiz successfully deleted" });
});

const checkQuiz = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;
    const answers = req.body;

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId }).populate(
        "questions"
    );
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    const questions = quiz.questions;
    const results = [];
    let score = 0;

    questions.forEach((question, index) => {
        const questionResult = {};
        if (index in answers) {
            if (question.type === "identification") {
                if (!answers[index]) {
                    questionResult.remark = "unanswered";
                } else if (
                    question.options.includes(answers[index]) ||
                    question.answer.toString() === answers[index]
                ) {
                    questionResult.remark = "correct";
                    score++;
                } else {
                    questionResult.remark = "incorrect";
                }
            } else {
                if (answers[index] === question.answer.toString()) {
                    questionResult.remark = "correct";
                    score++;
                } else {
                    questionResult.remark = "incorrect";
                }
            }
        } else {
            questionResult.remark = "unanswered";
        }

        questionResult.userAnswer = answers[index];
        questionResult.questionDetails = {
            description: question.description,
            type: question.type,
            options: question.options,
            answer: question.answer,
        };
        results.push(questionResult);
    });

    const token = req.headers.authorization.split(" ")[1];

    if (token && token !== "null") {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
        quizTaker = user.username;
        quizSetCreator = user.username;
    } else {
        quizTaker = "anonymous";
    }

    const newAttemptHistory = await AttemptHistory({
        score,
        user: quizTaker,
        quizSetCreator: quizSetCreator,
        quizSet: quiz.id,
        quizTitle: quiz.title,
        details: results,
    });

    await newAttemptHistory.save();

    res.status(201).json({
        message: "Attempt history successfully created!",
        attemptHistory: newAttemptHistory,
        displayId: quiz.displayId,
    });
});

const getAttemptDetails = asyncHandler(async (req, res) => {
    const { attemptId } = req.params;

    const attempt = await AttemptHistory.findById(attemptId).populate(
        "quizSet"
    );

    if (!attempt) {
        return res.status(404).json({ message: "Attempt not found" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (token && token !== "null") {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);

        if (attempt.user === "anonymous" || user.username === attempt.user) {
            return res.status(201).json({
                message: "Attempt details successfully retrieved!",
                attempt,
            });
        }
    } else {
        if (attempt.user === "anonymous") {
            return res.status(201).json({
                message: "Attempt details successfully retrieved!",
                attempt,
            });
        }
    }

    res.status(401).json({ message: "You are unauthorized to access this." });
});

const getAttemptHistory = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;

    const quiz = await QuizSet.findOne({ displayId: quizDisplayId });

    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    const user = await User.findById(req.user);

    const attemptHistory = await AttemptHistory.find({
        quizSet: quiz.id,
        user: user.username,
    });

    const filteredAttemptHistory = filterAttemptHistory(attemptHistory);

    res.status(201).json({
        message: "Attempt history successfully retrieved",
        quizName: quiz.title,
        quizDisplayId: quiz.displayId,
        attemptHistory: filteredAttemptHistory,
    });
});

const getAttemptsByUser = async (req, res) => {
    const user = await User.findById(req.user);
    const attemptHistory = await AttemptHistory.find({
        user: user.username,
    });

    res.status(201).json({
        message: "Attempt history successfully retrieved",
        attemptHistory,
    });
};

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    getPublicQuiz,
    updateQuiz,
    deleteQuiz,
    checkQuiz,
    getAttemptDetails,
    getAttemptHistory,
    getAttemptsByUser,
};
