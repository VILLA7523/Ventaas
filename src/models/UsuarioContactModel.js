const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");
const tools = require("../libs/tools");


class UsuarioContactModel {
   
    async create(DNI , Nombres , PrimerApellido , SegundoApellido , Ciudad , FechadeNac , Email , Password) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call registrar_usr(? , ? , ? , ? , ? , ? , ? , ?)",
            [DNI , Nombres , PrimerApellido , SegundoApellido , Ciudad , FechadeNac , Email , tools.toHash(Password)]
        );
        return data[0];
    }

    async getAll() {
        const con = connectionDb.promise();
        const data = await con.query(
            "call get_all_usrs()"
        );
        return data[0];
    }

    async searchUsersByFilters(fullname, pais) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call search_usrs_ny_filters(?,?)", [fullname,pais]
        );
        return data[0];
    }

    async GetDirecciones(token)
    {
        const con = connectionDb.promise();
        const data = await con.query(
            "call getDirecciones(?)", [token]
        );
        return data[0];
    }
}

module.exports = UsuarioContactModel;