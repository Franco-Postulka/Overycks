const express = require("express");
const router = express.Router();

const {
  getProductWithImages,
  getAllProductsWithImages,
} = require("../controllers/productController");

router.get("/products/:id", getProductWithImages);
router.get("/products", getAllProductsWithImages);

module.exports = router;
