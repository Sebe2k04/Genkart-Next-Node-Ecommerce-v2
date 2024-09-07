const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db/config");

const router = require("./routes/router");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes")

const PORT = process.env.PORT || 5555;

app.use(cookieParser());
app.use('/',router);
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/product',productRoutes);
app.use('/user',userRoutes);
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
