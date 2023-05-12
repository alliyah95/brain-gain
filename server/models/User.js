const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("../utils/validators");

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            unique: true,
            trim: true,
            minlength: 3,
            validate: [validator.validateUsername, "Invalid username"],
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            validate: [validator.validatePassword, "Invalid password"],
        },
        name: {
            type: String,
            required: [true, "Please enter a name"],
            validate: [validator.validateName, "Invalid name"],
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
