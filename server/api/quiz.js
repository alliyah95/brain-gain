const express = require("express");
const router = express.Router({ mergeParams: true });
const quizController = require("../controllers/quiz");
const { isLoggedIn, isQuizOwner } = require("../middleware/auth");

router.post("/create_quiz", isLoggedIn, quizController.createQuiz);
router.get("/quiz_sets", isLoggedIn, quizController.getQuizzes);
router.patch(
    "/update_quiz/:quizDisplayId",
    isLoggedIn,
    isQuizOwner,
    quizController.updateQuiz
);
router.delete(
    "/delete_quiz/:quizDisplayId",
    isLoggedIn,
    isQuizOwner,
    quizController.deleteQuiz
);
router.get(
    "/quiz/:quizDisplayId",
    isLoggedIn,
    isQuizOwner,
    quizController.getQuiz
);

module.exports = router;
