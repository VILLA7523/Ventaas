const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");
const tool = require("../libs/tools");

class ProductsModel {
    async getAll(){
        const con = connectionDb.promise();
        const data = await con.query(
            "call get_all_prods()"
        );
        return data[0][0];
    }
    async getByID(id){
        const con = connectionDb.promise();
        const data = await con.query(
            "call get_prods_byID(?)" , [id]
        );
        return data[0][0][0];
    }
/*
    async search_prods_by_category (cat) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call search_prods_by_category(?)", [cat]
        );
        return data[0][0];
    }*/

    async create_product(nombre,img,precio,talla,para,stock,nomcategoria,nomproveedor) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call crear_Producto(?,?,?,?,?,?,?,?)" , [nombre,img,precio,talla,para,stock,nomcategoria,nomproveedor]
        );
    }
}
module.exports = ProductsModel;