const { body, validationResult } = require("express-validator");

const productValidationSchema = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("short_description")
    .notEmpty()
    .withMessage("Short description is required"),

  body("long_description")
    .notEmpty()
    .withMessage("Long description is required"),
   

  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 25, max: 50 })
    .withMessage("Quantity must be between 25 and 50"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("discount")
    .optional()
    .isNumeric()
    .withMessage("Discount must be a number")
    .default(0),

  body("status")
    .optional()
    .isIn(["pending", "active", "sold", "inactive"])
    .withMessage("Status must be one of: pending, active, sold, inactive"),

  body("charity_id")
    .notEmpty()
    .withMessage("Charity ID is required")
    .isMongoId()
    .withMessage("Charity ID must be a valid ObjectId"),

  body("category_id")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Category ID must be a valid ObjectId"),
];

function validateProduct(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const err = result.array();
    return res.status(400).json({
      message: err[0].msg,
    });
  } else {
    next();
  }
}

module.exports = { productValidationSchema, validateProduct };
