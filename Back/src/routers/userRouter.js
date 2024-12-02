const express = require("express");
const router = express.Router();
const {
  login,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticationToken } = require("../middlewares/auth");

router.post("/registracion", createUser);
router.post("/login", login);
router.get("/users", authenticationToken, getAllUsers);
router.put("/users/:userID", authenticationToken, updateUser);
router.put("/users/:userID", authenticationToken, updateUser);
router.delete("/users/:userID", authenticationToken, deleteUser);

module.exports = router;
