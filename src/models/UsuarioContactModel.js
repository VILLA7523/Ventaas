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
}

module.exports = UsuarioContactModel;