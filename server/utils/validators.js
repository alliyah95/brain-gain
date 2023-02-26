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

const validateOptions = (options) => {
    return options && options.length >= 2;
};

module.exports = {
    validateName,
    validatePassword,
    validateUsername,
    validateOptions,
};
