const express = require("express");
const router = express.Router();

const {
  getProductWithImages,
  getAllProductsWithImages,
  createProduct,
} = require("../controllers/productController");

router.get("/products/:id", getProductWithImages);
router.get("/products", getAllProductsWithImages);
router.post("/create", createProduct);

module.exports = router;
