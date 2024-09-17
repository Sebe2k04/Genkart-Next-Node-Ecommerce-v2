const Products = require("../models/productSchema");
const cloudinary = require("../config/cloudinary");
require("dotenv").config();
const createProduct = async (req, res) => {
  const {
    name,
    vendor,
    quantity,
    description,
    MRPprice,
    sellingPrice,
    category,
    trend,
    offer,
  } = req.body;

  console.log(req.files);
  try {
    const imageResult = await cloudinary.uploader.upload(
      req.files.image[0].path,
      {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      }
    );

    // Upload additional images if any
    let additionalImages = [];
    if (req.files.additionalImages) {
      const additionalImagesUploadPromises = req.files.additionalImages.map(
        (img) =>
          cloudinary.uploader.upload(img.path, {
            folder: process.env.CLOUDINARY_FOLDER_NAME,
          })
      );
      const additionalImagesResults = await Promise.all(
        additionalImagesUploadPromises
      );
      additionalImages = additionalImagesResults.map(
        (result) => result.secure_url
      );
    }

    const newProduct = new Products({
      name,
      description,
      quantity,
      vendor,
      MRPprice,
      sellingPrice,
      category,
      trend,
      offer,
      image: imageResult.secure_url,
      additionalImages: additionalImages,
    });
    console.log(newProduct);
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
      vendor,
      quantity,
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
    console.log(product.image);

    // let imageUrl = product.imageUrl;
    // if (req.file) {
    //   const publicId = product.imageUrl.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(publicId);

    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: process.env.CLOUDINARY_FOLDER_NAME,
    //   });
    //   imageUrl = result.secure_url;
    // }

    console.log(req.files.image);
    if (req.files.image) {
      // Delete the old image from Cloudinary (optional, based on your use case)
      if (product.image) {
        const publicId = product.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      }
      const imageResult = await cloudinary.uploader.upload(
        req.files.image[0].path
      );
      product.image = imageResult.secure_url;
    }

    if (req.files.additionalImages) {
      // Delete old additional images from Cloudinary (optional)
      if (product.additionalImages.length > 0) {
        for (let image of product.additionalImages) {
          console.log(image);
          const publicId = image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
      }
      const additionalImagesUploadPromises = req.files.additionalImages.map(
        (img) => cloudinary.uploader.upload(img.path)
      );
      const additionalImagesResults = await Promise.all(
        additionalImagesUploadPromises
      );
      product.additionalImages = additionalImagesResults.map(
        (result) => result.secure_url
      );
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.MRPprice = MRPprice || product.MRPprice;
    product.sellingPrice = sellingPrice || product.sellingPrice;
    product.category = category || product.category;
    product.trend = trend || product.trend;
    product.offer = offer || product.offer;
    product.vendor = vendor || product.vendor;
    product.quantity = quantity || product.quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete({ _id: req.params.id });
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getProducts = async (req, res) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 8,
  } = req.query;
  try {
    console.log(
      search,
      "s",
      category,
      "c",
      minPrice,
      "m",
      maxPrice,
      "m",
      page,
      limit
    );
    const query = {};
    if (search) {
      console.log("s");
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      console.log("c");

      query.category = category;
    }
    // if (minPrice > 0 && maxPrice > 0) {
    //   console.log("m", minPrice, maxPrice);
    //   query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    // }
    if (minPrice > 0) {
      query.sellingPrice = { ...query.sellingPrice, $gte: Number(minPrice) };
    }
    if (maxPrice > 0) {
      query.sellingPrice = { ...query.sellingPrice, $lte: Number(maxPrice) };
    }

    const products = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({ products, totalPages });
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
  const { search, page = 1, limit = 8 } = req.query;
  console.log("trend");
  const query = {};

  try {
    if (search) {
      console.log("s");
      query.name = { $regex: search, $options: "i" };
    }
    query.trend = true;
    const products = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const offerProducts = async (req, res) => {
  const { search, page = 1, limit = 8 } = req.query;
  const query = {};

  try {
    console.log("offer");

    if (search) {
      console.log("s");
      query.name = { $regex: search, $options: "i" };
    }
    query.offer = true;

    console.log(query,"query");
    const products = await Products.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    console.log(products);
    const totalProducts = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);
    res.status(200).json({ products, totalPages });
  } catch (error) {
    res.status(500).json({ message: "Error fetching Offer products", error });
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
