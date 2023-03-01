const express = require("express");
const router = express.Router({ mergeParams: true });
const quizController = require("../controllers/quiz");
const { isLoggedIn } = require("../middleware/auth");

router.post("/create_quiz", isLoggedIn, quizController.createQuiz);
router.get("/quiz_sets", isLoggedIn, quizController.getQuizzes);
router.post("/add_question", isLoggedIn, quizController.addQuestion);
router.patch("/update_quiz", isLoggedIn, quizController.updateQuiz);
router.delete("/delete_quiz", isLoggedIn, quizController.deleteQuiz);
router.get("/quiz/:displayId", isLoggedIn, quizController.getQuiz);

module.exports = router;
