const express = require("express");
const router = express.Router();
const {
  addToCarrito,
  getAllProductsInCarrito,
  deleteProductFromCarrito,
} = require("../controllers/carrritoController");
const { authenticationToken } = require("../middlewares/auth");

router.post("/addcarrito", authenticationToken, addToCarrito);
router.get("/productos/:id", authenticationToken, getAllProductsInCarrito);
router.delete("/delete", authenticationToken, deleteProductFromCarrito);

module.exports = router;
