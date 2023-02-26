const QuizSet = require("../models/Quiz/QuizSet");
const Question = require("../models/Quiz/Question");
const validators = require("../utils/validators");
const asyncHandler = require("express-async-handler");

const createQuiz = asyncHandler(async (req, res) => {
    const { title, createdBy } = req.body;
    let { description } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title cannot be empty" });
    }

    if (!createdBy) {
        return res
            .status(400)
            .json({ message: "Quiz creator cannot be empty" });
    }

    if (!description) {
        description = "";
    }

    const newQuizSet = await QuizSet({
        title,
        description,
        createdBy,
        questions: [],
        attempts: [],
    });

    await newQuizSet.save();
    res.status(201).json({ message: "Quiz successfully created!" });
});

const getQuizzes = asyncHandler(async (req, res) => {
    // const { id } = req.user;

    // TODO: change the hard coded id to req.user.id after frontend is built
    const quizSets = await QuizSet.find({
        createdBy: "63fa13eb5e29dff5067d0000",
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

const addQuestion = asyncHandler(async (req, res) => {
    const { quizSetId, description, type, options, answer } = req.body;

    const validationError = validators.validateQuestion({
        description,
        type,
        options,
        answer,
    });

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const quizSet = await QuizSet.findById(quizSetId);

    if (!quizSet) {
        return res.status(400).json({ message: "Cannot find quiz set!" });
    }

    const questionData = { description, type, answer, quizSet: quizSetId };

    if (type === "multiple choice") {
        questionData.options = options;
    }

    if (type === "true or false") {
        questionData.options = [true, false];
        questionData.answer = Boolean(answer);
    }

    const newQuestion = await Question(questionData);
    await newQuestion.save();

    quizSet.questions.push(newQuestion);
    await quizSet.save();

    res.status(201).json({ message: "Question successfully added!" });
});

module.exports = { createQuiz, getQuizzes, addQuestion };
