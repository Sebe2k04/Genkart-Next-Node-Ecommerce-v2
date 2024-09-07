const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
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
  imageUrl: {
    type: String,
    required: true,
  },
  trend:{
    type: Boolean,
    default: false,
    required: true,
  },
  offer:{
    type: String,
    default: false,
    required: true,
  }
},{
  timestamps: true,
});

const Products = new mongoose.model("Products", productSchema);
module.exports = Products;