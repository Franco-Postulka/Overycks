const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

//Importar routes

// EJ: const themoviedbRoutes = require('./routes/themoviesdb');

// Use de las Routes

// EJ: app.use('/api/themoviesdb', themoviedbRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
