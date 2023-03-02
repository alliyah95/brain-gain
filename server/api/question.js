const express = require("express");
const router = express.Router({ mergeParams: true });
const quizController = require("../controllers/quiz");
const questionController = require("../controllers/question");
const { isLoggedIn, isQuizOwner } = require("../middleware/auth");

router.post(
    "/add_question/:quizId",
    isLoggedIn,
    isQuizOwner,
    questionController.addQuestion
);

module.exports = router;
