const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");
const tools = require("../libs/tools");


class TarjetaModel {
    async create(_NumeroTarjeta  , _CVV , _Nombre, _MMAA, _PrimerApellido ,  _SegundoApellido, _Email , _ID_Usuario) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call insertar_Tarjeta(? , ? , ? , ? , ? , ? , ? , ?)",
            [_NumeroTarjeta  , _CVV , _Nombre, _MMAA, _PrimerApellido ,  _SegundoApellido, _Email , _ID_Usuario]
        );
        return data[0];
    }
}

module.exports = TarjetaModel;