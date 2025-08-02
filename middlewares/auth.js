const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateUser(req, res, next) {
  try {
    let token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    console.log(process.env.JWT_SECRET);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          err: err.message,
          message: "Failed to decode the token",
        });
      } else {
        console.log("this is decoded data from authentication",decoded);
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    return res.status(400).json({
      status: "failed",
      message: "Authentication failure, User not logged in",
    });
  }
}

module.exports = { authenticateUser };
