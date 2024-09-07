const Users = require("../models/userSchema");
const Admin = require("../models/adminSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");

require("dotenv").config();

const generateToken = (userId, secret, expiresIn) => {
  return jwt.sign({ userId }, secret, { expiresIn });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(
      user.id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login Error", error });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

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

  try {
    const user = Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const adminToken = generateToken(
      user.id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );

    res.cookie("adminToken", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Login Error", error });
  }
};

const adminSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Signup failed" });
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
}
