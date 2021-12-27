const express = require("express");
const router = express.Router();
const UsuarioContactModel = require("../models/UsuarioContactModel");
const UserDb = new UsuarioContactModel();
const LoginModel = require("../models/LoginModel");
const LoginDb = new LoginModel();
const PedidoModel = require("../models/PedidoModel");
const PedidoDb = new PedidoModel();
const TarjetaModel = require("../models/TarjetaModel");
const TarjetaDb = new TarjetaModel();

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

    async getAll()
    {
        const resultUser = UserDb.getAll();
        const dataUser = await resultUser.catch(err=>{
            console.log("controller Error Register", err);
            return null;
    })
        console.log("dataUser", dataUser);
        return dataUser;
    }

    async searchUsersByFilters(fullname, pais)
    {
        const resultUser = UserDb.searchUsersByFilters(fullname,pais);
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

     async CreatePedido (token , Direccion )
     {
        const resultPedido = PedidoDb.create(token , Direccion);
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

    async GetDirecciones(token)
    {
        const resultAllPedido = UserDb.GetDirecciones(token);
        const dataAllPedido = await resultAllPedido.catch((err)=>{
            console.log("controller Error Login ", err);
            return null;
        });
        console.log("dta" , dataAllPedido);
        return dataAllPedido;
    }

     async InsertarTarjeta(_NumeroTarjeta  , _CVV , _Nombre, _MMAA, _PrimerApellido ,  _SegundoApellido, _Email , _ID_Usuario) {
        const resultTarjeta = TarjetaDb.create(_NumeroTarjeta  , _CVV , _Nombre, _MMAA, _PrimerApellido ,  _SegundoApellido, _Email , _ID_Usuario);
        const dataTarjeta  = await resultTarjeta.catch((err)=>{
            console.log("controller Error Tarjeta ", err);
            return null;
        });
        console.log("data" , dataTarjeta);
        return dataTarjeta;
       }
}

module.exports = UsuarioController;
