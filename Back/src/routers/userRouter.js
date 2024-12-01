const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");

router.post("/registracion", createUser);

module.exports = router;
