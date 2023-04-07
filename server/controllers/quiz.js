const QuizSet = require("../models/Quiz/QuizSet");
const Question = require("../models/Quiz/Question");
const AttemptHistory = require("../models/Quiz/AttemptHistory");
const validators = require("../utils/validators");
const asyncHandler = require("express-async-handler");

const createQuiz = asyncHandler(async (req, res) => {
    const creator = req.user;
    const { title } = req.body;
    let { description } = req.body;

    const validationError = validators.validateQuiz({ title, creator });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    if (!description) {
        description = "";
    }

    const newQuizSet = await QuizSet({
        title,
        description,
        createdBy: creator,
        questions: [],
        attempts: [],
    });

    await newQuizSet.save();
    res.status(201).json({
        message: "Quiz successfully created!",
        quiz: newQuizSet,
    });
});

const updateQuiz = asyncHandler(async (req, res) => {
    const { quizDisplayId } = req.params;
    const { title, description } = req.body;

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
                } else if (question.options.includes(answers[index])) {
                    questionResult.remark = "correct";
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
        questionResult.questionDetails = question.id;
        results.push(questionResult);
    });

    const newAttemptHistory = await AttemptHistory({
        score,
        user: req.user,
        quizSet: quiz.id,
        details: results,
    });

    await newAttemptHistory.save();

    res.status(201).json({
        message: "Attempt history successfully created!",
        attemptHisotry: newAttemptHistory,
    });
});

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    checkQuiz,
};
