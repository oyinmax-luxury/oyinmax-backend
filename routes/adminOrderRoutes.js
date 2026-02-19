const express = require('express');
const { getAdminStats } = require('../controllers/adminOrderController');
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();


router.get('/stats', protect, adminOnly, getAdminStats);



module.exports = router;