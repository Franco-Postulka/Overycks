const db = require("../config/database");

//Añadir a favoritos
const addToFavorites = async(productId, userId) =>
{
    const [result] = await db.query("INSERT INTO favoritos (id_producto, id_usuario) VALUES (?,?)",
    [productId, userId]);
    return [result];
}

//Eliminar de favoritos
const deleteToFavorites = async(productId) =>
{
    const [result] = await db.query("DELETE FROM favoritos WHERRE id = ?",
    [productId]);
    return [result];
}

//Traer favoritos
const getToFavorites = async(userId) =>
{
    const [result] = await db.query("SELECT id_producto FROM favoritos WHERE id_producto = ?",
    [userId]);
    return result;
}

module.exports = {addToFavorites, deleteToFavorites, getToFavorites};