const express = require("express");
const router = express.Router({ mergeParams: true });
const quizController = require("../controllers/quiz");

router.post("/create_quiz", quizController.createQuiz);
router.get("/quiz_sets", quizController.getQuizzes);
router.post("/add_question", quizController.addQuestion);
router.post("/update_quiz", quizController.updateQuiz);
router.delete("/delete_quiz", quizController.deleteQuiz);

module.exports = router;
