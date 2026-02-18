const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


const router = express.Router();

// Logged in user routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin routes
router.get("/", protect, adminOnly, getAllUsers);
router.get("/:id", protect, adminOnly, getUserById);

module.exports = router;