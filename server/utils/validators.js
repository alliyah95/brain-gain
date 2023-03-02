const mongoose = require("mongoose");

const validateName = (name) => {
    // accepts letters, spaces, hyphen, and an apostrophe
    return /^[ a-zA-Z\-\’]+$/.test(name);
};

const validatePassword = (password) => {
    // min 8 chars, alphanumeric, one special character
    return /^(?=.*[0-9])(?=.*[!_@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(password);
};

const validateUsername = (username) => {
    return /^[A-Za-z][A-Za-z0-9_]{5,29}$/.test(username);
};

const validateUser = async ({
    username,
    password,
    confirmedPassword,
    name,
}) => {
    if (!username || !password || !confirmedPassword || !name) {
        return "Please provide all required information";
    }

    if (!validateUsername(username)) {
        return "Invalid username";
    }

    if (!validatePassword(password)) {
        return "Invalid password";
    }

    if (!validateName(name)) {
        return "Invalid name";
    }

    if (password !== confirmedPassword) {
        return "Passwords do not match";
    }

    return null;
};

const validateCredentials = ({ username, password }) => {
    if (!username || !password) {
        return "Incorrect username or password";
    }

    return null;
};

const validateOptions = (options, type) => {
    return options && options.length >= 2;
};

const validateQuiz = ({ title, creator }) => {
    if (!title) {
        return "Title cannot be empty";
    }

    if (!creator) {
        return "Quiz creator cannot be empty";
    }

    return null;
};

const validateQuizUpdateValues = ({ id, title }) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return "Invalid quiz ID";
    }

    if (!title) {
        return "Quiz title cannot be empty";
    }

    return null;
};

const validateQuestion = ({ description, type, options, answer }) => {
    if (!description) {
        return "Description cannot be empty";
    }

    if (!type) {
        return "Please choose the type of the question";
    }

    switch (type) {
        case "multiple choice":
            if (!options || options.length < 2) {
                return "Please provide at least 2 options";
            }
            break;
        case "true or false":
        case "identification":
            break;
        default:
            return "Invalid question type";
    }

    if (!answer) {
        return "Please provide the correct answer for the question";
    }

    return null;
};

module.exports = {
    validateName,
    validatePassword,
    validateUsername,
    validateUser,
    validateCredentials,
    validateOptions,
    validateQuestion,
    validateQuiz,
    validateQuizUpdateValues,
};
