const { body, validationResult } = require("express-validator");

const addressValidationSchema = [
  body("location")
    .notEmpty()
    .withMessage("Location is required")
    .isString()
    .withMessage("Location must be a string"),

  body("city")
    .notEmpty()
    .withMessage("City is required")
    .isString()
    .withMessage("City must be a string"),

  body("pincode")
    .notEmpty()
    .withMessage("Pincode is required")
    .isPostalCode("IN")
    .withMessage("Pincode must be a valid Indian postal code"),

  body("state")
    .notEmpty()
    .withMessage("State is required")
    .isString()
    .withMessage("State must be a string"),

  body("country")
    .notEmpty()
    .withMessage("Country is required")
    .isString()
    .withMessage("Country must be a string")
    .isIn(["India"])
    .withMessage("Currently only India is supported"),
];

function validateAddress(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "failed",
      message: errors.array()[0].msg,
    });
  }
  next();
}

module.exports = { addressValidationSchema, validateAddress };
