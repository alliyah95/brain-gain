const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/user");

router.route("/register").post(userController.registerUser);

module.exports = router;
