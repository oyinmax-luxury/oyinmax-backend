const express = require("express");


const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController.js");

const { protect } = require("../middleware/authMiddleware.js");
const { adminOnly } = require("../middleware/adminMiddleware.js");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getUserOrders);

router.get("/", protect, adminOnly, getAllOrders);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;