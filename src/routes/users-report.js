var express = require("express");
var router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const UsuarioDb = new UsuarioController();

router.get("/users", async (req, res) => {
    const output = UsuarioDb.getAll();
    res.render('users-report', {data : output})
});

router.get("/users/:fullname/:pais", async (req, res) => {
    const output = UsuarioDb.searchUserByFilters(req.params.fullname, re);
    res.render('users-report', {data : output})
});
module.exports = router;