const express = require("express");
const router = new express.Router();
const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");

const authMiddleWare = require("../middlewares/authMiddleware");

router.post("/", authMiddleWare, addToCart);

router.delete("/:id", authMiddleWare, removeFromCart);

router.get("/", authMiddleWare, getCart);

module.exports = router;
