const express = require("express");


const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController.js");

const { protect, adminOnly } = require("../middleware/authMiddleware.js");


const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getUserOrders);

router.get("/", protect, adminOnly, getAllOrders);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;