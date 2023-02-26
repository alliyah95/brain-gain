const QuizSet = require("../models/Quiz/QuizSet");
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

module.exports = { createQuiz };
