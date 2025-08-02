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

// 1. Create category (admin / super_admin only)
router.post("/", authenticateUser, upload.single("image"), createCategory);

// 2. Admin panel (admin own only, super_admin  all)
router.get("/admin", authenticateUser, getCategoriesForAdmins);

// 3. Update category title
router.patch("/:id", authenticateUser, updateCategoryTitle);

// 4. Public endpoint to fetch all categories
router.get("/", getPublicCategories);

module.exports = router;
