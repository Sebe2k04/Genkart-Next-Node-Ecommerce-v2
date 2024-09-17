const Users = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
require("dotenv").config();

const generateToken = (userId, secret, expiresIn) => {
  return jwt.sign({ userId }, secret, { expiresIn });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(
      user.id,
      process.env.JWT_USER_SECRET,
      process.env.JWT_EXPIRES_IN
    );

    res.cookie("userToken", token, {
      // domain:process.env.DOMAIN_NAME,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite:  process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, 
    });
    // res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: "Login successful",token });
  } catch (error) {
    res.status(500).json({ message: "Login Error", error });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("userToken");
    res.json({ message: "Logout successful" });
  } catch (error) {
    res.status(400).json({ message: "Logout failed" });
  }
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
console.log(email)
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendEmail(
      user.email,
      "Password Reset",
      `Reset your password here: ${process.env.CLIENT_URL}/reset-password?token=${resetToken}`
    );
    // await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reset email" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  console.log(token, newPassword)

  try {
    const user = await Users.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const admin = await Admin.findOne({ email: email });
  console.log("adminone", admin);
  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  console.log("admin", admin.email);

  const isMatch = await bcrypt.compare(password, admin.password);
  console.log("ismatch", isMatch);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const adminToken = generateToken(
    admin.id,
    process.env.JWT_SECRET,
    process.env.JWT_EXPIRES_IN
  );

  res.cookie("adminUserToken", adminToken, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({ message: "Login successful",adminToken });
};

const adminLogout = (req, res) => {
  res.clearCookie("adminUserToken");
  res.json({ message: "Logout successful" });
};

const adminSignup = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    console.log("admin created", admin);
    await admin.save();

    res.status(201).json({ message: "admin created", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
  adminLogin,
  adminSignup,
  adminLogout,
};
