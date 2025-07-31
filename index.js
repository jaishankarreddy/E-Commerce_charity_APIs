const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
require("dotenv").config();
const port = process.env.PORT || 8080;
const url = process.env.MONGODB_URL;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/user", userRouter);

function connectToMongoDB() {
  mongoose.connect(url);
  console.log("✅connected to db");
}

app.listen(port, () => {
  connectToMongoDB();
  console.log(`App running on port ${port}`);
});
