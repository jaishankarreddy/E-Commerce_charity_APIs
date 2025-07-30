const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8080;
const url = process.env.MONGODB_URL;

app.get("/", (req, res) => {
  res.send("hello");
});

function connectToMongoDB() {
  mongoose.connect(url);
  console.log("✅connected to db");
}

app.listen(port, () => {
  connectToMongoDB();
  console.log(`App running on port ${port}`);
});
