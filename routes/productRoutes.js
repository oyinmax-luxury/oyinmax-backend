const express = require("express");
const { createProduct, getProducts, getSingleProduct, updateProduct, deleteProduct, createProductReview } = require("../controllers/productController.js");
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

router.get("/:id", protect, adminOnly, getSingleProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.post("/:id/reviews", protect, createProductReview);

module.exports = router;