const shortid = require("shortid");

const generateQuizDisplayId = () => {
    return shortid.generate(10);
};

module.exports = { generateQuizDisplayId };
