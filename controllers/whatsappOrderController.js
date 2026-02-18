const WhatsappOrder = require('../models/WhatsappOrderSchema');

// @desc    Create new whatsapp order
// @route   POST /api/whatsapp-orders
// @access  Public
const createWhatsappOrder = async (req, res) => {
  try {
    const { 
      customerName, 
      email, 
      shippingAddress, 
      orderItems, 
      totalPrice 
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    // UPDATED: Generate a simple unique ID (e.g., OW-12345)
    const orderId = `OW-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = new WhatsappOrder({
      customerName,
      email,
      shippingAddress,
      orderItems,
      totalPrice,
      orderId
    });

    const createdOrder = await order.save();
    
    // Send back the ID so the frontend knows it was saved
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error saving order' });
  }
};

// UPDATED: Get orders for a specific user by email
const getMyOrders = async (req, res) => {
  try {
    // Assuming user email comes from req.user set by 'protect' middleware
    const orders = await WhatsappOrder.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await WhatsappOrder.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await WhatsappOrder.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error('Order not found');
    }

    // Update status based on body
    order.status = req.body.status || order.status;
    order.isPaid = req.body.isPaid ?? order.isPaid;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating order' });
  }
};

module.exports = { createWhatsappOrder, getMyOrders, getAllOrders, updateOrderStatus };