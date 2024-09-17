const Users = require("../models/userSchema");
const cloudinary = require("../config/cloudinary");
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
  const { page = 1, limit = 10 } = req.query;
  console.log(page, limit);
  try {
    // const user = await Users.find();
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // } else {
    //   return res.status(200).json({ user });
    // }
    const users = await Users.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    console.log(users, "user");
    const totalUsers = users.length;
    console.log(totalUsers, "users");
    const totalPages = Math.ceil(totalUsers / limit);
    console.log(totalPages);
    res.status(200).json({ users, totalPages, totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const editUserData = async (req, res) => {
  const { name } = req.body;
  console.log(name);
  try {
    const user = await Users.findById(req.userId); // exclude the password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(req.file, "file");
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: process.env.CLOUDINARY_FOLDER_NAME,
      });
      user.profileImage = result.secure_url;

      console.log(result.secure_url);
    }

    user.name = name || user.name;
    const updatedUserData = await user.save();
    res.status(200).json(updatedUserData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  singleUserData,
  allUsers,
  editUserData,
};
