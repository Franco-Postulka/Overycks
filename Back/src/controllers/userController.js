const becrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUserSchema } = require("../utils/validacion");
const userModel = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = createUserSchema.parse(req.body);
    const usuarioExiste = await userModel.checkUusario(username, email);
    if (usuarioExiste.length > 0) {
      return res
        .status(400)
        .json({ message: "El usuario o el email ya existe" });
    }
    const hashedPassword = await becrypt.hash(password, 10);

    const result = await userModel.insertUser(username, email, hashedPassword);
    res.status(201).json({
      status: "success",
      message: "Usuario registrado con exito",
      userID: result.insertId,
    });
  } catch (error) {
    res.status(400).json({
      stauts: "error",
      message: "error al resgistrar al usuario",
      error: error.message,
    });
  }
};

module.exports = { createUser };
