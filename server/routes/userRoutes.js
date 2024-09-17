const express = require("express");
const router = new express.Router();
const upload = require("../middlewares/multer");

const {
  singleUserData,
  allUsers,
  editUserData,
} = require("../controllers/userController");

const authMiddleWare = require("../middlewares/authMiddleware");

const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

router.get("/me", authMiddleWare, singleUserData);

router.get("/all", adminAuthMiddleware, allUsers);

router.put("/me",authMiddleWare, upload.single("image"), editUserData);

module.exports = router;
