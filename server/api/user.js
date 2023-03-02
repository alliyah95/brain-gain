const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user");
const { isAlreadyLoggedIn } = require("../middleware/auth");

router.post("/register", isAlreadyLoggedIn, userController.registerUser);
router.post("/login", isAlreadyLoggedIn, userController.loginUser);

module.exports = router;
