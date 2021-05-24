const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/App";
const cors = require("cors");

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true});
const con = mongoose.connection;

con.on("open", () => {
  console.log("connected...");
});

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const exerciseRouter = require("./routes/exercise");
app.use("/exercise", exerciseRouter);

app.listen(9000, () => {
  console.log("Server is running on port");
});
