const z = require("zod");

const validacionSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).jason({
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

module.exports = { createUserSchema, validacionSchema };
