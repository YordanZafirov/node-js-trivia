const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const { db } = require("./db/db");
const categoryRouter = require("./routes/category");
const difficultyRouter = require("./routes/difficulty");
const questionRouter = require("./routes/question");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/category", categoryRouter);
app.use("/difficulty", difficultyRouter);
app.use("/question", questionRouter);

app.listen(PORT);
