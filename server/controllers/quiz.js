const QuizSet = require("../models/Quiz/QuizSet");
const Question = require("../models/Quiz/Question");
const validators = require("../utils/validators");
const asyncHandler = require("express-async-handler");

const createQuiz = asyncHandler(async (req, res) => {
    const { title, createdBy } = req.body;
    let { description } = req.body;

    const validationError = validators.validateQuiz({ title, createdBy });
    if (validationError) {
        return res.status(400).json({ message: validationError });
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

const updateQuiz = asyncHandler(async (req, res) => {
    const { id, title, description } = req.body;

    const validationError = validators.validateQuizUpdateValues({ id, title });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const quiz = await QuizSet.findById(id);
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
        { _id: id },
        { $set: updatedFields },
        { new: true }
    );

    res.status(200).json({
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
    });
});

const getQuizzes = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const quizSets = await QuizSet.find({
        createdBy: id,
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
    const { displayId } = req.body;

    const quiz = await QuizSet.findOne({ displayId });
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz successfully retrieved", quiz });
});

const deleteQuiz = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // modify code for authorization
    // if (req.user.id !== quiz.createdBy) {
    //     return res.status(401).json({ message: "Unauthorized" });
    // }

    const quiz = await QuizSet.findById(id);
    if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
    }

    const deletedQuiz = await QuizSet.findByIdAndDelete(id);
    if (!deletedQuiz) {
        return res.status(500).json({ message: "Failed to delete quiz" });
    }

    await Question.deleteMany({ quizSet: id });
    // await AttemptHistory.deleteMany({ quizId: id });

    res.status(201).json({ message: "Quiz successfully deleted" });
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

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    addQuestion,
};
