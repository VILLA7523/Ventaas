const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");

class CategoriesModel {
    async getAll() 
    {
        const con = connectionDb.promise();
        const data  =await con.query('call get_all_cate ()')
        return data[0][0]; 
    }

    async getAllProductsByCategorie(id)
    {
        const con = connectionDb.promise();
        const data = await con.query('call get_prods_by_pcategoria(?) ', [id]);
        return data[0][0];
    }

    async searchByName (name)
    {
        const con = connectionDb.promise();
        const data = await con.query('call search_prods_by_category(?)', [name]);
        return data[0][0];
    }

}
module.exports = CategoriesModel;