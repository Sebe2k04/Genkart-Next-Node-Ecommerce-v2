// controllers/cartController.js

const Users = require('../models/userSchema');
const Products = require('../models/productSchema');
require("dotenv").config();
// Add a product to the cart
const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Assuming you have a middleware to attach the authenticated user

  try {
    const user = await Users.findById(userId);

    // Check if the product already exists in the cart
    const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
    
    if (cartItemIndex > -1) {
      // If product exists, update the quantity
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Otherwise, add the product to the cart
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const user = await Users.findById(userId);

    // Remove the product from the cart
    user.cart = user.cart.filter(item => item.product.toString() !== productId);

    await user.save();
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Get the user's cart
const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await Users.findById(userId).populate('cart.product'); // Populate product details
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


module.exports = {
  addToCart,
  removeFromCart,
  getCart
}