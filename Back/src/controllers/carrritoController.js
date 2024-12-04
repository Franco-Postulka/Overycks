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
    if (error.message.startsWith("Duplicate entry")) {
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

const getAllProductsInCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const productsInCarrito = await carritoModel.getAllProductsInCarrito(id);
    if (productsInCarrito.length >= 1) {
      res.json({
        status: "success",
        message: "Obtencion de productos en carrito exitosa",
        productsInCarrito,
      });
    } else {
      return res
        .status(400)
        .json({ message: "El suario no tiene productos en el carrito" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en obtencion de productos.",
      error: error.message,
    });
  }
};

module.exports = { addToCarrito, getAllProductsInCarrito };
