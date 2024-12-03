const carritoModel = require("../models/carritoModel");

const addToCarrito = async (req, res) => {
  try {
    let { id_producto, id_usuario } = req.body;
    id_producto = parseInt(id_producto);
    id_usuario = parseInt(id_usuario);
    const result = await carritoModel.addPorductToCarrito(
      id_producto,
      id_usuario
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Error al agregar producto al carrito",
      });
    }
    res.status(201).json({
      status: "success",
      message: "Producto añadido con exito al carrito",
      data: result,
    });
  } catch (error) {
    if (
      error.message === "Duplicate entry '2-1' for key 'carrito.id_producto'"
    ) {
      res.status(400).json({
        stauts: "error",
        message: "El producto ya ha sido añadido al carrito.",
        error: error.message,
      });
    } else {
      res.status(400).json({
        stauts: "error",
        message: "Error al agregar producto al carrito.",
        error: error.message,
      });
    }
  }
};

module.exports = { addToCarrito };
