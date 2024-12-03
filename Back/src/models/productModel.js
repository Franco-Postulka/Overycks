const db = require("../config/database");

//buscar por id
const findProductoById = async (id) => {
  const [result] = await db.query(
    "SELECT id, titulo, descripcion, precio FROM producto WHERE id = ?",
    [id]
  );
  return result;
};
//buscar imagenes por ID
const findImagesByProductId = async (id) => {
  const [result] = await db.query(
    `
        SELECT imagenes.id, imagenes.url 
        FROM imagenes 
        INNER JOIN imagenes_productos ON imagenes.id = imagenes_productos.id_imagenes
        WHERE imagenes_productos.id_producto = ?;
      `,
    [id]
  );
  return result;
};

module.exports = { findProductoById, findImagesByProductId };
