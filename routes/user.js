const express = require("express");
const router = express.Router();
const { registeruser, login } = require("../controllers/user");

const {
  validateUserFieldsRegister,
  validateUserSchema,
  validateUserFielsLogin,
} = require("../middlewares/user");

router.post(
  "/register",
  validateUserFieldsRegister,
  validateUserSchema,
  registeruser
);

router.post("/login", validateUserFielsLogin, validateUserSchema, login);

module.exports = router;

