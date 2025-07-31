const { body, validationResult } = require("express-validator");

const validateUserFieldsRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("mobile").isMobilePhone().withMessage("Valid mobile number is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .isLength({ max: 12 })
    .withMessage("Password mush be below 12 characters"),
  body("role")
    .isIn(["admin", "super_admin", "user"])
    .withMessage("Role must be 'admin' or 'super_admin' or 'user'"),
];

const validateUserFielsLogin = [
  body("user_id").notEmpty().withMessage("user id required"),
  body("password").notEmpty().withMessage("password is required"),
];

function validateUserSchema(req, res, next) {
  let results = validationResult(req);
  if (!results.isEmpty()) {
    let errors = results.array();
    return res.status(400).json({
      status: "Failed",
      message: errors[0].msg,
    });
  } else {
    next();
  }
}

module.exports = {
  validateUserFieldsRegister,
  validateUserSchema,
  validateUserFielsLogin,
};
