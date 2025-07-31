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
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ max: 12 })
    .withMessage("Password mush be below 12 characters"),
  body("role")
    .isIn(["admin", "super_admin", "user"])
    .withMessage("Role must be 'admin' or 'super_admin' or 'user'"),
];

const validateUserFielsLogin = [
  body("user_id").notEmpty().withMessage("user id required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    )
    .isLength({ max: 12 })
    .withMessage("Password mush be below 12 characters"),
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
