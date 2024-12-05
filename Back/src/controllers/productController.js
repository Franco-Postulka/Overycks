const productoModel = require("../models/productModel");
const {
  validacionSchema,
  createProductSchema,
} = require("../utils/validacion");

const getProductWithImages = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productoModel.findProductById(id);
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

const getAllProductsWithImages = async (req, res) => {
  try {
    const products = await productoModel.getAllProducts();
    const images = await productoModel.getImages();
    const imagesMap = await productoModel.getImagesMapedProductos();

    const productsWithImages = products.map((product) => {
      const productImages = imagesMap
        .filter((map) => map.id_producto === product.id)
        .map((map) => images.find((image) => image.id === map.id_imagenes));

      return {
        ...product,
        images: productImages.filter(Boolean), // Elimina valores nulos o undefined
      };
    });

    res.json({
      status: "success",
      message: "Obtencion de productos exitosa",
      productsWithImages,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en obtencion de producto.",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { titulo, descripcion, precio, imagenes } = createProductSchema.parse(
      req.body
    );

    const result = await productoModel.insertProduct(
      titulo,
      descripcion,
      precio,
      imagenes
    );
    res.status(201).json({
      status: "success",
      message: "Producto creado con exito",
      productId: result.productId,
    });
  } catch (error) {
    res.status(400).json({
      stauts: "error",
      message: "Error al crear el producto",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        status: "error",
        message: "ID de producto inválido",
      });
    }

    const result = await productoModel.deleteProduct(parseInt(id));
    if (!result.success) {
      return res.status(404).json({ status: "error", message: result.message });
    }
    res.json({
      status: "success",
      message: "Producto eliminado con exito",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Producto no se pudo eliminar",
      error: error,
    });
  }
};

module.exports = {
  getProductWithImages,
  getAllProductsWithImages,
  createProduct: [validacionSchema(createProductSchema), createProduct],
  deleteProduct,
};
