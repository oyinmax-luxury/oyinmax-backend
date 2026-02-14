
const {Product} = require('../models/Product');
const {cloudinary} = require('../config/cloudinary');

// @desc Admin Create Product
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock, sizes, colors } = req.body;

    const imageUploads = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload_stream(
          { folder: "oyinmax_products" },
          (error, result) => {
            if (error) throw error;
            imageUploads.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          }
        );

        result.end(file.buffer);
      }
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
    next(error);
  }
};

// @desc Public Get Products (Pagination + Filtering)
const getProducts = async (req, res, next) => {
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
    next(error);
  }
};


module.exports = {createProduct, getProducts};