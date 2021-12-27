var express = require("express");
var router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const UsuarioDb = new UsuarioController();


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));


router.get("/users", async (req, res) => {
    const output = UsuarioDb.getAll();
    res.render('users-report',{data : output})
});

router.get("/users/:fullname/:pais", async (req, res) => {
    const output = UsuarioDb.searchUserByFilters(req.params.fullname, req.params.pais);
    res.render('users-report',{data : output})
});