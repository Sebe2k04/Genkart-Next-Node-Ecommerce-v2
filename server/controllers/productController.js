const Products = require("../models/productSchema");
const cloudinary = require("../config/cloudinary");
require("dotenv").config();
const createProduct = async (req, res) => {
  const { name, description, MRPprice, sellingPrice, category, trend, offer } =
    req.body;
  try {
    let imageUrl = "";

    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      });
      imageUrl = result.secure_url;
    }
    const newProduct = new Products({
      name,
      description,
      MRPprice,
      sellingPrice,
      category,
      trend,
      offer,
      imageUrl,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      MRPprice,
      sellingPrice,
      category,
      trend,
      offer,
    } = req.body;

    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let imageUrl = product.imageUrl;
    if (req.file) {
      const publicId = product.imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      });
      imageUrl = result.secure_url;
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.MRPprice = MRPprice || product.MRPprice;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;
    product.trend = trend || product.trend;
    product.offer = offer || product.offer;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.remove();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const trendProducts = async (req, res) => {
  try {
    const products = await Products.find({ trend: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const offerProducts = async (req, res) => {
  try {
    const products = await Products.find({ offer: true });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  trendProducts,
  offerProducts,
};
