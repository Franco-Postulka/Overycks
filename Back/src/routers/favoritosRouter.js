const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');

//Ruta agregar a favoritos
router.post('/favoritos/:id', auth.authenticationToken, addToFavorites);
//Ruta eliminar de favoritos
router.post('/favoritos/:id', auth.authenticationToken, deleteToFavorites);
//Ruta traer favoritos
router.get('/favoritos/:id', auth.authenticationToken, getToFavorites);

module.exports = router;