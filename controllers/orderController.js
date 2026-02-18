const {Order} = require("../models/Order.js");
const {Product} = require("../models/Product.js");
const mongoose = require("mongoose");

// @desc Create Order


const createOrder = async (req, res, next) => {

  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // ... Validation ...

    for (const item of orderItems) {
      // REMOVE .session(session)
      const product = await Product.findById(item.product);                

      if (!product) throw new Error("Product not found");

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      product.stock -= item.quantity;
      await product.save(); // REMOVE { session }
    }

    const order = await Order.create({ // REMOVE array brackets
        user: req.user._id,
        orderItems,
        shippingAddress,
        totalPrice,
    }); 

    res.status(201).json(order); // ADJUST order[0] to order

  } catch (error) {
    console.error("Error creating order:", error);
    next(error);
  }
};

// const createOrder = async (req, res, next) => {
//    const session = await mongoose.startSession();
//    session.startTransaction();

//   try {
//     const { orderItems, shippingAddress, totalPrice } = req.body;

//     if (!orderItems || orderItems.length === 0) {
//       res.status(400);
//       throw new Error("No order items");
//     }

//     for (const item of orderItems) {
//       const product = await Product.findById(item.product).sesion(session)
//       if (!product) throw new Error("Product not found");

//       if (product.stock < item.quantity) {
//         throw new Error(`Insufficient stock for ${product.name}`);
//       }

//       product.stock -= item.quantity;
//       await product.save({ session }); // Pass session to save
//     }

//     const order = await Order.create(
//       [
//         {
//           user: req.user._id,
//           orderItems,
//           shippingAddress,
//           totalPrice,
//         },
//       ],
//       { session }
//     );

//     // await session.commitTransaction();
//     // session.endSession();

//     res.status(201).json(order[0]);
//   } catch (error) {
//     // await session.abortTransaction();
//     // session.endSession();
//     console.log(error);
//     next(error);
//   }
// };

const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id}).sort({createdAt: -1});
    res.json(orders);
};


const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name email").sort({createdAt: -1});
    res.json(orders);
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    order.orderStatus = req.body.status || order.orderStatus;

    await order.save();

    res.json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };