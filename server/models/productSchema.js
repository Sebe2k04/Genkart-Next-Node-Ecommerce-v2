const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
      default:"GenRio"
    },
    MRPprice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    additionalImages: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 10,
    },
    trend: {
      type: Boolean,
      default: false,
      required: true,
    },
    offer: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Products = new mongoose.model("Products", productSchema);
module.exports = Products;
