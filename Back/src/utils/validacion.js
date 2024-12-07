const z = require("zod");
const { updateProduct } = require("../models/productModel");

const validacionSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Entrada no valida",
      error: error.message,
    });
  }
};

const createUserSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  email: z.string().email("Formato de correo no valido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener un minimo de 8 caracteres"),
});

const updateUserSchema = createUserSchema.partial();

const createProductSchema = z.object({
  titulo: z
    .string()
    .min(3, "El título del producto debe tener al menos 3 caracteres.")
    .max(120, "El título no puede exceder los 120 caracteres."),
  descripcion: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(500, "La descripción no puede exceder los 500 caracteres."),
  precio: z.number().positive("El precio debe ser un número positivo."),
  imagenes: z
    .array(z.string().url("Cada imagen debe ser una URL válida."))
    .length(4, "Debe proporcionar exactamente 4 URLs de imágenes."),
});

const updateProductSchema = createProductSchema
  .extend({
    imagenes: z.array(
      z.object({
        id: z.number(),
        url: z.string().url("Cada imagen debe ser una URL válida."),
      })
    ),
  })
  .partial();

module.exports = {
  validacionSchema,
  createUserSchema,
  updateUserSchema,
  createProductSchema,
  updateProductSchema,
};
