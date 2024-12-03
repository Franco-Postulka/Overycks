const productoModel = require("../models/productModel");

const getProductWithImages = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productoModel.findProductoById(id);
    if (!product.length) {
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado",
      });
    }
    const images = await productoModel.findImagesByProductId(id);
    if (!images.length) {
      return res.status(404).json({
        status: "error",
        message: "Imágenes no encontradas para este producto",
      });
    }
    const productWithImages = {
      ...product[0],
      images,
    };
    res.json({
      status: "success",
      message: "Obtencion de producto exitosa",
      productWithImages,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en obtencion de producto.",
      error: error.message,
    });
  }
};

module.exports = { getProductWithImages };
