const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

//Importar routes
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const carritoRouter = require("./routers/carritoRouter");
const favoritosRouter = require("./routers/favoritosRouter");

// Use de las Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/favoritos", favoritosRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
