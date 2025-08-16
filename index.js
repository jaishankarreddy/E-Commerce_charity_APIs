const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const charityRouters = require("./routes/charity");
const productRouters = require("./routes/product");
const addressRoutes = require("./routes/address");

require("dotenv").config();
const port = process.env.PORT || 8080;
const url = process.env.MONGODB_URL;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/charity", charityRouters);
app.use("/api/v1/product", productRouters);
app.use("/api/v1/users/address", addressRoutes);

function connectToMongoDB() {
  mongoose.connect(url);
  console.log("✅connected to db");
}

app.listen(port, () => {
  connectToMongoDB();
  console.log(`App running on port ${port}`);
});
