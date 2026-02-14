const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: String,
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    images: [
      {
        public_id: String,
        url: String,
      },
    ],

    sizes: [String],
    colors: [String],

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    reviews: [reviewSchema],

    rating: {
      type: Number,
      default: 0,
    },

    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Performance indexes
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model("Product", productSchema);



module.exports = {Product};