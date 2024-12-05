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

const insertProduct = async (titulo, descripcion, precio, imagenes) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    //insercion en la tabla producto
    const [productoResult] = await connection.query(
      "INSERT INTO producto (titulo, descripcion, precio) VALUES (?, ?, ?)",
      [titulo, descripcion, precio]
    );
    const idProducto = productoResult.insertId;

    //Insercion en la tabla imagenes y su tabla de interrelacion
    for (const url of imagenes) {
      const [imagenResult] = await connection.query(
        "INSERT INTO imagenes (url) VALUES (?)",
        [url]
      );
      const idImagen = imagenResult.insertId;

      await connection.query(
        "INSERT INTO imagenes_productos (id_producto, id_imagenes) VALUES (?, ?)",
        [idProducto, idImagen]
      );
    }

    await connection.commit();
    return { success: true, productId: idProducto };
  } catch (error) {
    await connection.rollback();
    console.error("Error al insertar producto e imágenes:", error);
    return { success: false, error };
  } finally {
    connection.release();
  }
};

module.exports = {
  findProductById,
  findImagesByProductId,
  getAllProducts,
  getImages,
  getImagesMapedProductos,
  insertProduct,
};
