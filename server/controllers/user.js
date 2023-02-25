const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validators = require("../utils/validators");
const authUtilities = require("../utils/auth");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, confirmedPassword, name } = req.body;

    if (!username || !password || !name) {
        return res.status(422).json({
            message: "Please provide all required information",
        });
    }

    const foundUser = await User.findOne({ username });

    if (foundUser) {
        return res.status(409).json({ message: "Username is already in use" });
    }

    if (!validators.validateUsername(username)) {
        return res.status(422).json({ message: "Invalid username" });
    }

    if (!validators.validatePassword(password)) {
        return res.status(422).json({ message: "Invalid password" });
    }

    if (!validators.validateName(name)) {
        return res.status(422).json({ message: "Invalid name" });
    }

    if (password !== confirmedPassword) {
        return res.status(422).json({ message: "Passwords do not match" });
    }

    // password hashing
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // user registration
    const newUser = await User({
        username,
        password: hashedPassword,
        name,
    });

    await newUser.save();
    const authToken = authUtilities.generateJsonToken(newUser.id);

    res.status(201).json({
        message: "User successfully registered!",
        token: authToken,
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "User does not exist" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return res
            .status(401)
            .json({ message: "Incorrect username or password" });
    }

    const token = authUtilities.generateJsonToken(user.id);
    res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, username: user.username },
    });
});

module.exports = { registerUser, loginUser };
