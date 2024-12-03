const db = require("../config/database");

//buscar por id
const findProductById = async (id) => {
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

// traet todos los productos
const getAllProducts = async () => {
  const [result] = await db.query(
    "SELECT id, titulo, descripcion, precio FROM producto;"
  );
  return result;
};

//traer las imagenes 
const getImages = async () => {
  const [result] = await db.query("SELECT id, url FROM imagenes;");
  return result;
};
//traer interrelacion imagenes con productos
const getImagesMapedProductos = async () => {
  const [result] = await db.query(
    "SELECT id_producto, id_imagenes FROM imagenes_productos;"
  );
  return result;
};

module.exports = {
  findProductById,
  findImagesByProductId,
  getAllProducts,
  getImages,
  getImagesMapedProductos,
};
