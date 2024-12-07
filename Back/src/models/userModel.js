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

const getUserById = async (userId) =>
{
  const [result] = await db.query("SELECT id FROM usuario WHERE id = ?",
  [userId]);
  if(result.length > 0)
  {
    return true;
  }
  else
  {
    return false;
  }
}

//obtencion de usuario por pagina
const findUserWithPagination = async (limit, offset) => {
  const [result] = await db.query(
    "SELECT id, nombre ,email FROM usuario LIMIT ? OFFSET ?",
    [limit, offset]
  );
  return result;
};

//actualizacion de usuario
const updateUser = async (userID, updatedFields) => {
  const setClause = Object.keys(updatedFields)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(updatedFields), userID];
  const [result] = await db.query(
    `UPDATE usuario SET ${setClause} WHERE id = ?`,
    values
  );
  return result;
};

//eliminado de usuario
const deleteUser = async (userID) => {
  const [result] = await db.query(`DELETE FROM usuario WHERE id = ?`, userID);
  return result;
};

module.exports = {
  insertUser,
  checkUusario,
  findUserByUsername,
  findUserWithPagination,
  updateUser,
  deleteUser,
  getUserById
};
