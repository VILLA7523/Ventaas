const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");
const tool = require("../libs/tools");
 // yastoi :D:D :D
class VentasModel {
    async ventasReporte() {
        const con = connectionDb.promise();
        const data = await con.query(
            "call ganancias_por_prod()"
        );
        return data[0][0];
    }
}

