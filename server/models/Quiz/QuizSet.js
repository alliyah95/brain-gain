const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const quiz = require("../../utils/quiz");

const quizSetSchema = new Schema(
    {
        displayId: {
            type: String,
            default: quiz.generateQuizDisplayId,
            required: [true, "Cannot generate a display ID"],
            unique: true,
        },
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

// ensure that displayId is unique
quizSetSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        doc.displayId = quiz.generateQuizDisplayId();
        doc.save();
    }
    next();
});

const QuizSet = mongoose.model("QuizSet", quizSetSchema);
module.exports = QuizSet;
