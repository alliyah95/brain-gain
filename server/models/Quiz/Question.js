const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validators = require("../../utils/validators");

const questionSchema = new Schema({
    description: {
        type: String,
        required: [true, "Question cannot be empty"],
        trim: true,
    },
    type: {
        type: String,
        required: [true, "Please choose the type of the question"],
        enum: ["multiple choice", "true or false", "identification"],
    },
    options: {
        type: [String],
        required: function () {
            return this.type === "multiple choice";
        },
        validate: {
            validator: function (options) {
                if (this.type === "multiple choice") {
                    return options && options.length >= 1;
                }
                return true;
            },
            message: "Please provide at least 1 option",
        },
    },
    answer: {
        type: Schema.Types.Mixed,
        required: [true, "Please provide the correct answer for the question"],
    },
    quizSet: {
        type: Schema.Types.ObjectId,
        ref: "QuizSet",
    },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
