const {Product} = require('../models/Product');
const {User} = require('../models/User');
const WhatsappOrder = require('../models/WhatsappOrderSchema');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const [totalProducts, pendingOrders, totalUsers, deliveredOrders] = await Promise.all([
      Product.countDocuments(),
      WhatsappOrder.countDocuments({ status: 'Processing' }),
      User.countDocuments({ role: 'user' }), // We count customers only
      WhatsappOrder.find({ status: 'Delivered' }) // Find delivered orders for revenue
    ]);

    // Calculate total revenue from delivered orders
    const totalRevenue = deliveredOrders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
      totalProducts,
      pendingOrders,
      totalUsers,
      totalRevenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admin stats' });
  }
};

module.exports = { getAdminStats };