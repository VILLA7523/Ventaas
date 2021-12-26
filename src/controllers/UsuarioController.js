const express = require("express");
const router = express.Router();
const UsuarioContactModel = require("../models/UsuarioContactModel");
const UserDb = new UsuarioContactModel();
const LoginModel = require("../models/LoginModel");
const LoginDb = new LoginModel();
const PedidoModel = require("../models/PedidoModel");
const PedidoDb = new PedidoModel();

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
       })       
       console.log("dataLogin", dataLogin);
       return dataLogin;
     }

     async CreatePedido (token , Direccion , Ciudad,  _ID_Cupon)
     {
        const resultPedido = PedidoDb.create(token , Direccion , Ciudad , _ID_Cupon);
        const dataPedido = await resultPedido.catch((err)=>{
            console.log("controller Error Login ", err);
            return null;
        })       
        console.log("dataLogin", dataPedido);
        return dataPedido;
     }

     async getAllPedidos (token)
     {
        const resultAllPedido = PedidoDb.GetAllPedidos(token);
        const dataAllPedido = await resultAllPedido.catch((err)=>{
            console.log("controller Error Login ", err);
            return null;
        });
        console.log("dta" , dataAllPedido);
        return dataAllPedido;
     }
}

module.exports = UsuarioController;
