const express = require("express");
const router = express.Router();
const { addToCarrito } = require("../controllers/carrritoController");
const { authenticationToken } = require("../middlewares/auth");

router.post("/addcarrito", authenticationToken, addToCarrito);

module.exports = router;
