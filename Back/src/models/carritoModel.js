const db = require("../config/database");

// agregar porducto al carrito
const addPorductToCarrito = async (id_producto, id_usuario) => {
  const [result] = await db.query(
    "INSERT INTO carrito (id_producto, id_usuario, unidades) VALUES(?,?,1);",
    [id_producto, id_usuario]
  );
  return result;
};

// traet todos los productos
const getAllProductsInCarrito = async (id_usuario) => {
  const [result] = await db.query(
    `SELECT producto.id, producto.titulo, producto.descripcion, producto.precio 
    FROM producto
    INNER JOIN carrito ON carrito.id_producto = producto.id
    WHERE carrito.id_usuario = ?;`,
    [id_usuario]
  );
  return result;
};

module.exports = { addPorductToCarrito, getAllProductsInCarrito };
