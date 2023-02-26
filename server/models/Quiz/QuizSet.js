const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSetSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title cannot be empty"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question",
            },
        ],
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Quiz owner cannot be empty"],
        },
        attempts: [
            {
                type: Schema.Types.ObjectId,
                ref: "AttemptHistory",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const QuizSet = mongoose.model("QuizSet", quizSetSchema);
module.exports = QuizSet;
