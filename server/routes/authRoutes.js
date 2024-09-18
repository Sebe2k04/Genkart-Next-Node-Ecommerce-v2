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
  adminLogout,
} = require("../controllers/authController");
const Admin = require("../models/adminSchema");
const bcrypt = require('bcryptjs')

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signup);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password", resetPassword);

router.post("/admin/login", adminLogin);

router.post("/admin/logout", adminLogout);


//create admin

// router.post("/admin/signup", adminSignup);


module.exports = router;
