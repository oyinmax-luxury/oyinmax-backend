const mongoose = require('mongoose');



const WhatsappOrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }
  ],
  totalPrice: { type: Number, required: true },
  orderId: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    required: true, 
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('WhatsappOrder', WhatsappOrderSchema);