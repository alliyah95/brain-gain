const express = require("express");
const router = express.Router({ mergeParams: true });
const quizController = require("../controllers/quiz");

router.post("/create_quiz", quizController.createQuiz);
router.get("/quiz_sets", quizController.getQuizzes);

module.exports = router;
