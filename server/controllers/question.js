const QuizSet = require("../models/Quiz/QuizSet");
const Question = require("../models/Quiz/Question");
const validators = require("../utils/validators");
const asyncHandler = require("express-async-handler");

const addQuestion = asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const { description, type, options, answer } = req.body;

    const validationError = validators.validateQuestion({
        description,
        type,
        options,
        answer,
    });

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const quizSet = await QuizSet.findById(quizId);

    if (!quizSet) {
        return res.status(400).json({ message: "Cannot find quiz set!" });
    }

    const questionData = { description, type, answer, quizSet: quizId };

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

const editQuestion = asyncHandler(async (req, res) => {
    const { questionId } = req.params;
    const { description, type, options, answer } = req.body;

    const validationError = validators.validateQuestion({
        description,
        type,
        options,
        answer,
    });

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const question = await Question.findById(questionId);
    if (!question) {
        return res.status(400).json({ message: "Cannot find question!" });
    }

    const quizSet = await QuizSet.findById(question.quizSet);
    if (!quizSet) {
        return res.status(400).json({ message: "Cannot find quiz set!" });
    }

    question.description = description;
    question.type = type;
    question.answer = answer;

    if (type === "multiple choice") {
        question.options = options;
    } else if (type === "true or false") {
        question.options = [true, false];
        question.answer = Boolean(answer);
    }

    await question.save();
    res.status(200).json({ message: "Question successfully updated!" });
});

module.exports = { addQuestion, editQuestion };
