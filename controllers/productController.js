
const {Product} = require('../models/Product');
const {cloudinary} = require('../config/cloudinary');

// @desc Admin Create Product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, sizes, colors } = req.body;

    const imageUploads = [];

    

    // ... inside createProduct controller

    if (req.files && req.files.length > 0) {
    // 1. Create a function that returns a Promise for each file upload
    const uploadToCloudinary = (file) => {
        return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "oyinmax_products" },
            (error, result) => {
            if (error) return reject(error);
            resolve({
                public_id: result.public_id,
                url: result.secure_url,
            });
            }
        );
        stream.end(file.buffer);
        });
    };

    // 2. Map files to promises and await all of them
    const uploadPromises = req.files.map((file) => uploadToCloudinary(file));
    
    // 3. Wait for all uploads to finish
    const results = await Promise.all(uploadPromises);
    imageUploads.push(...results);
    }


    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      sizes,
      colors,
      images: imageUploads,
    });

    res.status(201).json(product);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Public Get Products (Pagination + Filtering)
const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const minPrice = req.query.minPrice
      ? { price: { $gte: Number(req.query.minPrice) } }
      : {};

    const maxPrice = req.query.maxPrice
      ? { price: { $lte: Number(req.query.maxPrice) } }
      : {};

    const filter = {
      ...keyword,
      ...category,
      ...minPrice,
      ...maxPrice,
    };

    const count = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {createProduct, getProducts};