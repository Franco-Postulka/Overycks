const express = require("express");
const router = express.Router();
const {
  login,
  createUser,
  getAllUsers,
} = require("../controllers/userController");
const { authenticationToken } = require("../middlewares/auth");

router.post("/registracion", createUser);
router.post("/login", login);
router.get("/users", authenticationToken, getAllUsers);

module.exports = router;
