const express = require('express');
const { getAllUsers, updateUserRole } = require('../controllers/adminUserController');
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin routes
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);


module.exports = router;