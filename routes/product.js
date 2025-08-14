const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");
const upload = require("../config/multer");
const {
  productValidationSchema,
  validateProduct,
} = require("../middlewares/product");
const {
  createProduct,
  updateProduct,
  updateProductStatus,
  getAllProducts,
  getProductsByCharityIdForAdmin,
  getAllProductsByCharityId,
  getAllProductsByCategoryId,
  getProductById,
} = require("../controllers/product");

router.post(
  "/",
  authenticateUser,
  upload.single("image"),
  productValidationSchema,
  validateProduct,
  createProduct
);

router.put(
  "/:id",
  authenticateUser,
  productValidationSchema,
  validateProduct,
  updateProduct
);

router.patch("/:id", authenticateUser, updateProductStatus);
router.get("/", getAllProducts);
router.get(
  "/admin/charity/:id",
  authenticateUser,
  getProductsByCharityIdForAdmin
);

router.get("/charity/:id", getAllProductsByCharityId);
router.get("/category/:id", getAllProductsByCategoryId);
router.get("/:id", getProductById);

module.exports = router;
