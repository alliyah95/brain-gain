require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// database config
const URI = process.env.DB_URI;
mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

// setup routes
const userRoutes = require("./api/user");
const quizRoutes = require("./api/quiz");
app.use("/", userRoutes);
app.use("/", quizRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
