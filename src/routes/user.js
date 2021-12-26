var express = require("express");
var router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const UsuarioDb = new UsuarioController();

router.get("/panel", async (req, res) => {
    const token = req.cookies.tokenUser;
    console.log("token", token);
    if (req.cookies.tokenUser) {
      res.render("productos", { title: "Express" });
    } else {
      res.redirect("/login");
    }
});

module.exports = router;
