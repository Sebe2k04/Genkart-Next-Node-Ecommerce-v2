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

router.post("/reset-password", resetPassword);

router.post("/admin/login", adminLogin);

router.post("/admin/logout", adminLogout);
// router.post("/admin/signup", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email,password)
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new Admin({ email, password: hashedPassword });
//     await user.save();

//     res.status(201).json({ message: "User created", user });
//   } catch (error) {
//     res.status(500).json({ error: "Signup failed" });
//   }
// });
router.post("/admin/signup", adminSignup);
// router.get("/admin/signup", async(req,res)=> {
//   res.status(200).send("server started");
// });

module.exports = router;
