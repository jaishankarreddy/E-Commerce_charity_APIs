const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");
const upload = require("../config/multer");
const {
  createCategory,
  getCategoriesForAdmins,
  getPublicCategories,
  updateCategoryTitle,
} = require("../controllers/category");

router.post("/", authenticateUser, upload.single("image"), createCategory);
router.get("/admin", authenticateUser, getCategoriesForAdmins);
router.patch("/:id", authenticateUser, updateCategoryTitle);
router.get("/", getPublicCategories);

module.exports = router;
