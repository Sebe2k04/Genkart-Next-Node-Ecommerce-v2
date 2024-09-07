const express = require("express");
const router = new express.Router();
const { singleUserData, allUsers } = require("../controllers/userController");

const authMiddleWare  = require("../middlewares/authMiddleware");

const adminAuthMiddleware = require("../middlewares/adminAuthMiddleware");

router.get("/me", authMiddleWare, singleUserData);

router.get("/all", adminAuthMiddleware, allUsers);

module.exports = router;
