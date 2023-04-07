const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attemptHistorySchema = new Schema({
    createdAt: {
        type: Date,
        default: function () {
            return new Date();
        },
    },
    score: {
        type: Number,
        required: [true, "No score was entered"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Quiz taker cannot be empty"],
    },
    quizSet: {
        type: Schema.Types.ObjectId,
        ref: "QuizSet",
        required: [true, "Quiz set cannot be empty"],
    },
    details: {
        type: [
            {
                remark: { type: String, required: true },
                userAnswer: { type: String },
                questionDetails: {
                    type: Schema.Types.ObjectId,
                    ref: "Question",
                    required: true,
                },
            },
        ],
        required: [true, "Attempt details cannot be empty"],
    },
});

const AttemptHistory = mongoose.model("AttemptHistory", attemptHistorySchema);
module.exports = AttemptHistory;
