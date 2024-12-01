const db = require("../config/database");

//creacion de un usuario nuevo
const insertUser = async (username, email, hashedPassword) => {
  const [result] = await db.query(
    "INSERT INTO usuario (nombre, email, contrasenia) VALUES(?,?,?)",
    [username, email, hashedPassword]
  );
  return result;
};

//buscar doplicado de usuario
const checkUusario = async (username, email) => {
  const [result] = await db.query(
    "SELECT id FROM usuario WHERE nombre = ? OR email =?",
    [username, email]
  );
  return result;
};

//buscar por username
const findUserByUsername = async (username) => {
  const [result] = await db.query(
    "SELECT id, contrasenia FROM usuario WHERE nombre = ?",
    [username]
  );
  return result;
};

//obtencion de usuario por pagina
const findUserWithPagination = async (limit, offset) => {
  const [result] = await db.query(
    "SELECT id, nombre ,email FROM usuario LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return result;
};

module.exports = {
  insertUser,
  checkUusario,
  findUserByUsername,
  findUserWithPagination,
};
