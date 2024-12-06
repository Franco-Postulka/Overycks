const favoritosModel = require("../models/favoritosModel");

//Agregar a favoritos
const addToFavorites = async(req, res) =>
{
    try
    {
        let userId = req.params.userId;
        let productoId = req.body;
        userId = parseInt(userId);
        productoId = parseInt(productoId);

        const result = await favoritosModel.addToFavorites(productoId, userId);
        if(result.affectedRows === 0)
        {
            return res.status(404).json
            ({
                status : 'error',
                message : 'Usuario no encontrado'
            });
        };

        res.json
        ({
                status : 'success',
                message : 'Producto agregado a favoritos con exito',
                data : result
        });
    }
    catch(error)
    {
        res.status(500).json
        ({
            status : 'error',
            message : 'Error al agregar a favoritos',
            error : error.message
        });
    };
};

//Eliminar de favoritos
const deleteToFavorites = async(req, res) =>
{
    try
    {
        let productId = req.body;
        productoId = parseInt(productoId);

        const result = await favoritosModel.deleteToFavorites(productId);
        if(result.affectedRows === 0)
        {
            return res.status(404).json
            ({
                status : 'error',
                message : 'Producto no encontrado'
            });
        };
        res.json
        ({
            status : 'success',
            message : 'Producto eliminado de favoritos con exito',
            data : result
        });
    }
    catch(error)
    {
        res.status(500).json
        ({
            status : 'error',
            message : 'Error al eliminar de favoritos',
            error : error.message
        });
    };
};

//Traer favoritos
const getToFavorites = async(req, res) =>
{
    try
    {
        let userId = req.params.userId;
        userId = parseInt(userId);

        const productId = await favoritosModel.getToFavorites(userId);

        if(productId.length === 0)
        {
            return res.status(404).json
            ({
                status: 'error',
                message: 'No se encontraron productos en favoritos',
                error : error.message
            });
        };

        res.json
        ({
            status: 'success',
            message: 'Productos traídos de forma exitosa',
            data: productId
        });
    }
    catch(error)
    {
        res.status(500).json
        ({
            status : 'error',
            message : 'Error al traer los productos de favoritos',
            error : error.message
        });
    };
};

module.exports = {addToFavorites, deleteToFavorites, getToFavorites};