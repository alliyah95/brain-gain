const QuizSet = require("../models/Quiz/QuizSet");
const Question = require("../models/Quiz/Question");
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
    res.status(201).json({ message: "Quiz successfully created!" });
});

const updateQuiz = asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const { title, description } = req.body;

    const validationError = validators.validateQuizUpdateValues({
        quizId,
        title,
    });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const quiz = await QuizSet.findById(quizId);
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
        { _id: quizId },
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
    const { quizId } = req.params;

    const quiz = await QuizSet.findById(quizId).populate("questions");
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz successfully retrieved", quiz });
});

const deleteQuiz = asyncHandler(async (req, res) => {
    const { quizId } = req.params;

    const quiz = await QuizSet.findById(quizId);
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    const deletedQuiz = await QuizSet.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
        return res.status(500).json({ message: "Failed to delete quiz" });
    }

    await Question.deleteMany({ quizSet: quizId });
    // await AttemptHistory.deleteMany({ quizId: id });

    res.status(201).json({ message: "Quiz successfully deleted" });
});

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
};
