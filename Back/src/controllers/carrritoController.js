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
    const imagesInCarrito = await carritoModel.getAllImagesInCarrito(id);
    if (productsInCarrito.length >= 1) {
      const productsWithImages = productsInCarrito.map((product) => {
        const images = imagesInCarrito
          .filter((image) => image.id === product.id) // image.id es el id del producto
          .map((image) => image.url);
        return { ...product, images };
      });

      res.json({
        status: "success",
        message: "Obtención de productos en carrito exitosa",
        products: productsWithImages,
      });
    } else {
      return res
        .status(400)
        .json({ message: "El usuario no tiene productos en el carrito" });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en obtencion de productos.",
      error: error.message,
    });
  }
};

const deleteProductFromCarrito = async (req, res) => {
  try {
    const { id_usuario, id_producto } = req.body;
    const result = await carritoModel.deletePorductoFromCarrito(
      id_usuario,
      id_producto
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Usuario o producto no encontrado" });
    }
    res.json({
      status: "success",
      message: "Producto eliminado con exito del carrito",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Producto no se pudo eliminar del carrito",
      error: error,
    });
  }
};

module.exports = {
  addToCarrito,
  getAllProductsInCarrito,
  deleteProductFromCarrito,
};
