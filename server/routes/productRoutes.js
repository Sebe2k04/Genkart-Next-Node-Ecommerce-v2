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

router.post("/", adminAuthMiddleWare, upload.fields([{ name: 'image', maxCount: 1  }, { name: 'additionalImages', maxCount: 3 }]), createProduct);

router.put("/:id", adminAuthMiddleWare, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'additionalImages', maxCount: 3 }]), updateProduct);

router.delete("/:id", adminAuthMiddleWare, deleteProduct);

router.get("/", getProducts);

router.get("/:id", getProductById);

router.get("/filter/trend", trendProducts);

router.get("/filter/offer", offerProducts);

module.exports = router;
