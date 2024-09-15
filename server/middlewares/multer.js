// middleware/multer.js
require("dotenv").config();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // }
});


// function checkFileType(file, cb) {
//   const filetypes = /jpeg|jpg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Images only!');
//   }
// }

module.exports = upload;
