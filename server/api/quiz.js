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
router.post(
    "/check_quiz/:quizDisplayId",
    isLoggedIn,
    isQuizOwner,
    quizController.checkQuiz
);
router.get(
    "/get_attempt_details/:quizDisplayId/:attemptId",
    isLoggedIn,
    isQuizOwner,
    quizController.getAttemptDetails
);
module.exports = router;
