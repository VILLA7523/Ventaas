const express = require("express");
const router = express.Router();
const connectionDb = require("../config/dbconnections");
const tools = require("../libs/tools");

class LoginModel {
    async authentication (Email , Password)
    {
        const con = connectionDb.promise();
        const data = await con.query("call verify_login(?)" , [Email]);        
        if(data != undefined)
        {
            console.log(data);
            const contr =  data[0][0][0].Contrasena;
            if(tools.compareHash(Password, contr)){
                return { status: "ok", id: data[0][0][0].DNI};
            }
            return { status: "error"}; 
        }
        return { status: "error"}; 
    }
}

module.exports = LoginModel;