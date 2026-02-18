const express = require('express');
const router = express.Router();
const { createWhatsappOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/whatsappOrderController');
const {protect, adminOnly} = require("../middleware/authMiddleware");

// Public route to create order
router.post('/', createWhatsappOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/orders', protect, adminOnly, getAllOrders);
router.put('/orders/:id', protect, adminOnly, updateOrderStatus);

module.exports = router;