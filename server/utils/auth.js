const { sign } = require("jsonwebtoken");

const generateJsonToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { generateJsonToken };
