const express = require("express");
const router = new express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");

const authMiddleWare = require("../middlewares/authMiddleware");

router.post("/add", authMiddleWare, addToCart);

router.delete("/remove", authMiddleWare, removeFromCart);

router.get("/", authMiddleWare, getCart);

module.exports = router;
