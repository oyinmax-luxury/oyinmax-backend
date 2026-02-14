const express = require("express");
const { createProduct, getProducts } = require("../controllers/productController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { adminOnly } = require("../middleware/authMiddleware.js");
const {upload} = require("../middleware/uploadMiddleware.js");

const router = express.Router();

// Public
router.get("/", getProducts);

// Admin
router.post(
  "/",
  protect,
  adminOnly,
  upload.array("images", 5),
  createProduct
);

module.exports = router;