const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: "Please log in to continue" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.userId;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Please log in to continue" });
    }
};

module.exports = { isLoggedIn };
