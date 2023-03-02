const express = require("express");
const router = express.Router({ mergeParams: true });
const questionController = require("../controllers/question");
const { isLoggedIn, isQuizOwner } = require("../middleware/auth");

router.post(
    "/add_question/:quizId",
    isLoggedIn,
    isQuizOwner,
    questionController.addQuestion
);
router.patch(
    "/edit_question/:quizId/:questionId",
    isLoggedIn,
    isQuizOwner,
    questionController.editQuestion
);

module.exports = router;
