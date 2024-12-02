const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validacionSchema, createUserSchema } = require("../utils/validacion");
const userModel = require("../models/userModel");

// login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const users = await userModel.findUserByUsername(username);
    if (users.length === 0) {
      return res.status(401).json({ message: "Credenciales no validas." });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.contrasenia);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales no validas." });
    }
    const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ status: "success", message: "Inicio de sesion exitoso", token });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en inicio de sesion",
      error: error.message,
    });
  }
};

// creacio de un nuevo usuario
const createUser = async (req, res) => {
  try {
    const { username, email, password } = createUserSchema.parse(req.body);
    const usuarioExiste = await userModel.checkUusario(username, email);
    if (usuarioExiste.length > 0) {
      return res
        .status(400)
        .json({ message: "El usuario o el email ya existe" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

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

// Obtencion de usuarios paginados
const getAllUsers = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.body;
    const offSet = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const users = await userModel.findUserWithPagination(limit, offSet);
    res.json({
      status: "success",
      message: "Usuarios obtenidos con exito",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};



module.exports = {
  login,
  createUser: validacionSchema(createUserSchema),
  createUser,
  getAllUsers,
};
