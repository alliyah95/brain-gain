require("dotenv").config({ path: "../.env" });

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? ["https://braingain.vercel.app"]
        : ["http://localhost:3000"];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not allow access from the specified origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
    })
);

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
const questionRoutes = require("./api/question");

app.use("/api", userRoutes);
app.use("/api", quizRoutes);
app.use("/api", questionRoutes);

app.head("/ping", (req, res) => {
    res.status(200).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
