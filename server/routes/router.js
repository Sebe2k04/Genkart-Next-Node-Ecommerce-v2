const express = require("express");
const router = new express.Router();
const { normal } = require("../controllers/basicController");

router.get("/", normal);


module.exports = router;