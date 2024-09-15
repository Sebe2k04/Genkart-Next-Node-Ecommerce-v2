const express = require("express");
const router = new express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  trendProducts,
  offerProducts,
} = require("../controllers/productController");

const upload = require("../middlewares/multer");

const  adminAuthMiddleWare  = require("../middlewares/adminAuthMiddleware");

router.post("/", adminAuthMiddleWare, upload.fields([{ name: 'image' }, { name: 'additionalImages' }]), createProduct);

router.put("/:id", adminAuthMiddleWare, upload.fields([{ name: 'image' }, { name: 'additionalImages' }]), updateProduct);

router.delete("/:id", adminAuthMiddleWare, deleteProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/trend", trendProducts);

router.get("/offer", offerProducts);

module.exports = router;
