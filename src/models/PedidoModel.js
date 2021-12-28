const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");
const tools = require("../libs/tools");

class PedidoModel {
    async create(DNI ,Ciudad ,  Direccion) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call crear_Pedido(? , ? , ? )",
            [DNI , Ciudad , Direccion]
        );
        if(data){
            return { status: "ok", data : data[0][0]};
        }
        return { status: "error"}; 
    }

    async GetAllPedidos(DNI) {
        const con = connectionDb.promise();
        const data = await con.query(
            "call getPedido(?)",
            [DNI]
        );
        console.log(data[0][0]);
        return data[0][0];
    }
}

module.exports = PedidoModel;