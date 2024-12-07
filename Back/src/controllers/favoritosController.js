const favoritosModel = require("../models/favoritosModel");
const userModel = require("../models/userModel");

//Agregar a favoritos
const addToFavorites = async(req, res) =>
{
    try
    {
        let userId = req.body.userId;
        let productoId = req.body.productoId;
        userId = parseInt(userId);
        productoId = parseInt(productoId);

        const userExists = await userModel.getUserById(userId);
        if (!userExists) 
        {
            return res.status(404).json({
                status: 'error',
                message: 'Usuario no encontrado',
            });
        }

        const result = await favoritosModel.addToFavorites(productoId, userId);

        res.json
        ({
                status : 'success',
                message : 'Producto agregado a favoritos con exito',
                data : result
        });
    }
    catch(error)
    {
        if (error.message.startsWith("Duplicate entry")) 
        {
            res.status(400).json
            ({
              stauts: "error",
              message: "El producto ya ha sido añadido al carrito.",
              error: error.message,
            });
        };
        res.status(500).json
        ({
            status : 'error',
            message : 'Error al agregar a favoritos',
            error : error.message
        });
    };
};

module.exports = addToFavorites;