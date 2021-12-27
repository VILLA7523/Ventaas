const express = require("express");
const router = express.Router();
const VentasModel = require("../models/VentasModel");
const VentasDb = new VentasModel();

class VentasController {
    async ventasReporte() {
        const resultVenta = VentasDb.ventasReporte();
        const data = await resultVenta.catch(err=>{
            console.log("controller Error Register", err);
            return null;
    }
    return data;

}