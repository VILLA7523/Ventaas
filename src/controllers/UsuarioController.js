const express = require("express");
const router = express.Router();
const UsuarioContactModel = require("../models/UsuarioContactModel");
const UserDb = new UsuarioContactModel();

class UsuarioController{
    async register(DNI , Nombres , PrimerApellido , SegundoApellido , Ciudad , FechadeNac , Email , Password) {
        const resultUser = UserDb.create(DNI , Nombres , PrimerApellido , SegundoApellido , Ciudad , FechadeNac , Email , Password);
        const dataUser = await resultUser.catch(err=>{
            console.log("controller Error Register", err);
            return null;
    })
    console.log("dataLogin", dataUser);
    return dataUser;
  }
}

module.exports = UsuarioController;
