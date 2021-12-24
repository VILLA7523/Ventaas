const express = require("express");
const router = express.Router();
const UsuarioContactModel = require("../models/UsuarioContactModel");
const UserDb = new UsuarioContactModel();
const LoginModel = require("../models/LoginModel");
const LoginDb = new LoginModel();

class UsuarioController{
    async register(DNI , Nombres , PrimerApellido , SegundoApellido , Ciudad , FechadeNac , Email , Password) {
        const resultUser = UserDb.create(DNI , Nombres , PrimerApellido , SegundoApellido , Ciudad , FechadeNac , Email , Password);
        const dataUser = await resultUser.catch(err=>{
            console.log("controller Error Register", err);
            return null;
    })
    console.log("dataUser", dataUser);
    return dataUser;
  }
  
     async login(Email , Password) {
       const resultLogin = LoginDb.authentication(Email , Password);
       const dataLogin = await resultLogin.catch((err)=>{
           console.log("controller Error Login ", err);
           return null;
       });
       console.log("dataLogin", dataLogin);
       return dataLogin;
     }
}

module.exports = UsuarioController;
