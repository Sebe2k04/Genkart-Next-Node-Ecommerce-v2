const express = require("express");
const router = new express.Router();
const {
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
  adminLogin,
  adminSignup,
} = require("../controllers/authController");

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/admin/login", adminLogin);

router.post("/admin/signup", adminSignup);

module.exports = router;
