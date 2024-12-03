const db = require("../config/database");

// agregar porducto al carrito
const addPorductToCarrito = async (id_producto, id_usuario) => {
  const [result] = await db.query(
    "INSERT INTO carrito (id_producto, id_usuario, unidades) VALUES(?,?,1);",
    [id_producto, id_usuario]
  );
  return result;
};

module.exports = { addPorductToCarrito };
