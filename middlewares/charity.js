const { body, validationResult } = require("express-validator");

// Charity Validation
const validateCharityFields = [
  body("name").notEmpty().withMessage("Charity name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("charity_email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email"),
  body("start_date").notEmpty().withMessage("Start date is required"),
  body("end_date").notEmpty().withMessage("End date is required"),
  body("platform_fee")
    .notEmpty()
    .withMessage("Platform fee is required")
    .isFloat({ min: 0 })
    .withMessage("Platform fee must be a non-negative number"),
  body("donation_fee")
    .notEmpty()
    .withMessage("Donation fee is required")
    .isFloat({ min: 0 })
    .withMessage("Donation fee must be a non-negative number"),
  body("profit")
    .notEmpty()
    .withMessage("Profit is required")
    .isFloat({ min: 0 })
    .withMessage("Profit must be a non-negative number"),
  body("banner")
    .custom((value, { req }) => {
      if (!req.file) throw new Error("Charity banner image is required");
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(req.file.mimetype)) {
        throw new Error("Image must be jpeg, jpg, or png");
      }
      return true;
    }),
];

// Error Handler
function validateSchema(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      status: "Failed",
      message: result.array()[0].msg,
    });
  }
  next();
}

module.exports = {
  validateCharityFields,
  validateSchema,
};

