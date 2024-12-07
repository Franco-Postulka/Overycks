const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middlewares/auth");

const {
  getProductWithImages,
  getAllProductsWithImages,
  createProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.get("/products/:id", getProductWithImages);
router.get("/products", getAllProductsWithImages);
router.post("/create", authenticationToken, createProduct);
router.delete("/delete/:id", authenticationToken, deleteProduct);
router.put("/update/:id", authenticationToken, updateProduct);

module.exports = router;
