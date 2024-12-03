const express = require("express");
const router = express.Router();

const { getProductWithImages } = require("../controllers/productController");

router.get("/products/:id", getProductWithImages);

module.exports = router;
