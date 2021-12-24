var express = require("express");
var router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const UsuarioDb = new UsuarioController();


router.get("/register", async function (req, res, next) {
    res.render("register", { title: "Express"});
});

router.get("/login", async function (req, res, next) {
    res.render("login", { title: "Express"});
});




router.post("/verifyregister", async (req, res) => {
    const user = await UsuarioDb.register(
        req.body.DNI,
        req.body.Nombres,
        req.body.PrimerApellido,
        req.body.SegundoApellido,
        req.body.Ciudad,
        req.body.FechadeNac,
        req.body.Email,
        req.body.Password,
      );
      console.log(user);
      if (user.insertId > 0) res.redirect("/login?msg=ok");
      else res.redirect("/register?msg=err");
});
  

router.post("/verifylogin", async (req, res) => {
    const user = await UsuarioDb.login(
        req.body.Email,
        req.body.Password,
    );
    console.log(user);
    if (user.status == "ok") {
        res.cookie("tokenUser", user.DNI, { httpOnly: true });
        res.redirect("/panel");
    } else {
        res.redirect("/login");
    }
});

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
