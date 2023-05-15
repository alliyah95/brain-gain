const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validators = require("../utils/validators");
const authUtilities = require("../utils/auth");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, confirmedPassword, name } = req.body;

    const validationError = await validators.validateUser({
        username,
        password,
        confirmedPassword,
        name,
    });

    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const foundUser = await User.findOne({ username });
    if (foundUser) {
        return res.status(400).json({ message: "Username is already in use!" });
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
        user: {
            id: newUser.id,
            name: newUser.name,
            username: newUser.username,
        },
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const validationError = validators.validateCredentials({
        username,
        password,
    });

    if (validationError) {
        return res.status(401).json({ message: validationError });
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: "User does not exist" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    const token = authUtilities.generateJsonToken(user.id);
    res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, username: user.username },
    });
});

module.exports = { registerUser, loginUser };
