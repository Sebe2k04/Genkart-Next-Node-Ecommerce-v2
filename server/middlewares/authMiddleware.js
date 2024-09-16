const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = (req, res, next) => {
  const token = req.cookies.userToken;
  console.log("token",token)
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports =  authMiddleware ;
