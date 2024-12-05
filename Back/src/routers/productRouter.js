const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middlewares/auth");

const {
  getProductWithImages,
  getAllProductsWithImages,
  createProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/products/:id", getProductWithImages);
router.get("/products", getAllProductsWithImages);
router.post("/create", authenticationToken, createProduct);
router.delete("/delete/:id", authenticationToken, deleteProduct);

module.exports = router;
