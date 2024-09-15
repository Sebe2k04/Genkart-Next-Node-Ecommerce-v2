const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const bodyParser = require('body-parser')

const router = require("./routes/router");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes")

require("dotenv").config();
require("./db/config");

// app.use(cors());

const PORT = process.env.PORT || 5555;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));


app.use(cookieParser());
app.use('/',router);
app.use('/api/auth',authRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/product',productRoutes);
app.use('/api/user',userRoutes);



// const allowCrossDomain = (req, res, next) => {
//   res.header(`Access-Control-Allow-Origin`, `*`);
//   res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
//   res.header(`Access-Control-Allow-Headers`, `*`);
//   next();
// };
// app.use(allowCrossDomain);


 // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))



app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
