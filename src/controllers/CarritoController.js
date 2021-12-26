const express = require("express");
const router = express.Router();
const ProductsModel = require("../models/ProductsModel");
const ProductDb = new ProductsModel();
const CarritoModel = require("../models/CarritoDeComprasModel");
const CarritoDb = new CarritoModel();
class CarritoController {
    async AddCarrito_Producto (token , id_product , id_cantidad )
    {
        const resultCarrito = CarritoDb. AddCarrito_Producto(token , id_product , id_cantidad) ;
        const dataCarrito = await resultCarrito.catch((err) => {
            console.log("Controller" , err);
            return null;
        });
        console.log("dataProducts" , dataCarrito);
        return dataCarrito;
    }

    async getAllProducts (token)
    {
        const resultCarrito = CarritoDb. getAllProducts (token) ;
        const dataCarrito = await resultCarrito.catch((err) => {
            console.log("Controller" , err);
            return null;
        });
        console.log("dataProducts" , dataCarrito);
        return dataCarrito;
    }

    async deleteProductsByID (token , id_product)
    {
        const resultCarrito = CarritoDb. deleteProductsByID(token , id_product) ;
        const dataCarrito = await resultCarrito.catch((err) => {
            console.log("Controller" , err);
            return null;
        });
        console.log("dataProducts" , dataCarrito);
        return dataCarrito;
    }
}

module.exports = CarritoController;
