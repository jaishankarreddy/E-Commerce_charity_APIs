const express = require("express");
const router = express.Router();
const {
  createCharity,
  getCharityAdmin,
  getAllCharity,
} = require("../controllers/charity");
const { authenticateUser } = require("../middlewares/auth");

const upload = require("../config/multer");

// Base URL: /api/v1/charity
router.post("/", authenticateUser, upload.single("banner"), createCharity);
router.get("/admin", authenticateUser, getCharityAdmin);
router.get("/", getAllCharity);

module.exports = router;
