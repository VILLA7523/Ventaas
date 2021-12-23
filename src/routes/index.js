var express = require("express");
var router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const UsuarioDb = new UsuarioController();



router.get("/register", async function (req, res, next) {
    res.render("register", { title: "Express"});
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
      if (user.insertId > 0) res.redirect("/register?msg=ok");
      else res.redirect("/register?msg=err");
});
  
module.exports = router;
