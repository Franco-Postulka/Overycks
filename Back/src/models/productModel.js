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

const deleteProduct = async (productID) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    //elimina imágenes asociadas al producto
    await connection.query(
      `DELETE FROM imagenes 
       WHERE id IN (
         SELECT id_imagenes 
         FROM imagenes_productos 
         WHERE id_producto = ?
       );`,
      [productID]
    );
    const [result] = await connection.query(
      `DELETE FROM producto WHERE id = ?;`,
      [productID]
    );
    await connection.commit();

    if (result.affectedRows === 0) {
      return { success: false, message: "Producto no encontrado" };
    }

    return { success: true, message: "Producto eliminado con éxito" };
  } catch (error) {
    await connection.rollback(); // Revertir cambios
    return { success: false, message: "Error al eliminar el producto", error };
  } finally {
    connection.release();
  }
};
const updateProduct = async (productID, updatedFields) => {
  const connection = await db.getConnection();
  try {
    if (!productID) throw new Error("El productID es obligatorio.");
    await connection.beginTransaction();
    const productFields = { ...updatedFields };
    delete productFields.imagenes;

    totalAffectedRows = 0;
    if (Object.keys(productFields).length > 0) {
      const setClause = Object.keys(productFields)
        .map((key) => `${key} = ?`)
        .join(", ");
      const values = [...Object.values(productFields), productID];

      const [result] = await connection.query(
        `UPDATE producto SET ${setClause} WHERE id = ?`,
        values
      );
      totalAffectedRows = result.affectedRows;
    }
    if (updatedFields.imagenes) {
      const imagenes = updatedFields.imagenes;

      for (const imagen of imagenes) {
        const [imageResult] = await connection.query(
          "UPDATE imagenes SET url = ? WHERE id = ?",
          [imagen.url, imagen.id]
        );
        totalAffectedRows += imageResult.affectedRows;
      }
    }
    await connection.commit();
    return { success: true, affectedRows: totalAffectedRows };
  } catch (error) {
    await connection.rollback();
    console.error("Error al actualizar el producto e imágenes:", error);
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
  deleteProduct,
  updateProduct,
};
