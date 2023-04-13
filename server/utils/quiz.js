const shortid = require("shortid");

const generateQuizDisplayId = () => {
    return shortid.generate(10);
};

const filterAttemptHistory = (attemptHistory) => {
    const filteredAttemptHistory = attemptHistory.map((attempt) => {
        return {
            id: attempt._id,
            score: attempt.score,
            totalScore: attempt.details.length,
            attemptDate: attempt.createdAt,
        };
    });

    return filteredAttemptHistory;
};
module.exports = { generateQuizDisplayId, filterAttemptHistory };
