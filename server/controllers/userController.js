const Users = require("../models/userSchema");
require("dotenv").config();

const singleUserData = async (req, res) => {
  try {
    // Assuming the user ID is available in req.user from authentication middleware
    const user = await Users.findById(req.userId).select("-password"); // exclude the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const allUsers = async (req, res) => {
  try {
    const user = await Users.find();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  singleUserData,
  allUsers,
};
