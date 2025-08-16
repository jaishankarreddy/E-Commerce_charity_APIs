const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");
const {
  createAddress,
  getAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/address");
const { addressValidationSchema, validateAddress } = require("../middlewares/address")

router.post("/",addressValidationSchema, validateAddress, authenticateUser, createAddress);
router.get("/", authenticateUser, getAddress);
router.put("/:id", authenticateUser, updateAddress);
router.delete("/:id", authenticateUser, deleteAddress);

module.exports = router;
