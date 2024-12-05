const db = require("../config/database");

// agregar porducto al carrito
const addPorductToCarrito = async (id_producto, id_usuario) => {
  const [result] = await db.query(
    "INSERT INTO carrito (id_producto, id_usuario, unidades) VALUES(?,?,1);",
    [id_producto, id_usuario]
  );
  return result;
};

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
const getAllImagesInCarrito = async (id_usuario) => {
  const [result] = await db.query(
    `SELECT producto.id, imagenes.url
    FROM 
        producto
    INNER JOIN 
        carrito ON carrito.id_producto = producto.id
    INNER JOIN 
        imagenes_productos ON producto.id = imagenes_productos.id_producto
    INNER JOIN 
        imagenes ON imagenes_productos.id_imagenes = imagenes.id
    WHERE 
        carrito.id_usuario = ?;`,
    [id_usuario]
  );
  return result;
};
const deletePorductoFromCarrito = async (id_usuario, id_producto) => {
  const [result] = await db.query(
    "DELETE FROM carrito WHERE id_usuario = ? AND id_producto = ?",
    [id_usuario, id_producto]
  );
  return result;
};

module.exports = {
  addPorductToCarrito,
  getAllProductsInCarrito,
  getAllImagesInCarrito,
  deletePorductoFromCarrito,
};
