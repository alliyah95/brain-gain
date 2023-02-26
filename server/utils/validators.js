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

const validateOptions = (options, type) => {
    return options && options.length >= 2;
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
    validateOptions,
    validateQuestion,
};
