const db = require("../config/database");

//Añadir a favoritos
const addToFavorites = async(productId, userId) =>
{
    console.log("insertando producto");
    const [result] = await db.query("INSERT INTO favoritos (id_producto, id_usuario) VALUES (?,?)",
    [productId, userId]);
    return [result];
}

module.exports = {addToFavorites};