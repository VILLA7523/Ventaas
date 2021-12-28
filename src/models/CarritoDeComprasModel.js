const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class CarritoDeCompras 
{
    async AddCarrito_Producto(id_usuario, id_product , cantidad) {
        const con = connectionDb.promise();
        const data = await con.query('call insertar_ProductoCarrito (?, ? , ?)' , [
            id_product,
            id_usuario,
            cantidad
        ]);
        if(data){
            return { status: "ok" };
        }
        return { status: "error"};
    }

    async getAllProducts(id) {
        const con = connectionDb.promise();
        const data = await con.query('call get_prod_by_carrito (?)' , [
            id
        ]);
        return data[0][0];
    }

    async getProductByID(id , token ){
        const con = connectionDb.promise();
        const data = await con.query('call get_prodscarrito_byID(? , ?)' , [
            id , token
        ]);
        return data[0][0];
    }

    async deleteProductsByID(id , id_product) {
        const con = connectionDb.promise();
        const data = await con.query('call eliminar_ProductoCarrito (? , ?)' , [
            id_product , id
        ]);
        console.log ("data" , data[0][0]);
        if(data){
            return { status: "ok" };
        }
        return { status: "error"};
    }

    async updateProductsByID (id , id_product , cantidad)
    {
        const con = connectionDb.promise();
        const data = await con.query('call update_ProductoCarrito (? , ? , ?)' , [
            id_product , id , cantidad
        ]);
        console.log ("data" , data[0][0]);
        if(data){
            return { status: "ok" };
        }
        return { status: "error"};
    }
}

module.exports = CarritoDeCompras;