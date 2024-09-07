const mongoose = require("mongoose")
require('dotenv').config();

const DB = process.env.MONGO_DB_URI

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>console.log("DATABASE connected"))
.catch((err)=>console.log("error : "+err.message))

