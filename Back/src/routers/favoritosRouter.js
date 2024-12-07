const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const addToFavorites = require("../controllers/favoritosController");

//Ruta agregar a favoritos
router.post('/addFavoritos', auth.authenticationToken, addToFavorites);

module.exports = router;