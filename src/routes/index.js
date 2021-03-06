var express = require("express");
var router = express.Router();
const ProductsController = require("../controllers/ProductsController");
const ProductsDb = new ProductsController();
const UsuarioController = require("../controllers/UsuarioController");
const UsuarioDb = new UsuarioController();
const CarritoController = require("../controllers/CarritoController");
const CarritoDb = new CarritoController();

router.get("/login", async function (req, res, next) {
    res.render("login", { title: "Express"});
});

router.get("/HacerPedido", async function (req, res, next) {
    const token = req.cookies.tokenUser;
    const data = await UsuarioDb.GetDirecciones(token);
    res.render("HacerPedido", { title: "Express" , direcciones : data });
});

router.get("/InsertarTarjeta", async function (req, res, next) {
  res.render("InsertarTarjeta", { title: "Express"});
});

router.get("/UpdateProductCarrito/:idProducto", async function (req, res, next) {
  const producto = await ProductsDb.getByID(req.params.idProducto);
  console.log(producto);
  res.render("UpdateProductCarrito" , {tittle : "express" , producto1 : producto})
});

router.post("/verifyTarjeta", async function (req, res, next) {
  const token = req.cookies.tokenUser;
  const tarjeta = await UsuarioDb.InsertarTarjeta(
    req.body.NumeroTarjeta,
    req.body.CVV,
    req.body.Nombre,
    req.body.MMAA,
    req.body.PrimerApellido,
    req.body.SegundoApellido,
    req.body.Email,
    token
  );
  
  console.log(tarjeta);
  if (tarjeta) res.redirect("/verPedidos");
  else res.redirect("/verPedidos");
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
      if (user) res.redirect("/login?msg=ok");
      else res.redirect("/register?msg=err");
});

router.post("/verifylogin", async (req, res) => {
    const user = await UsuarioDb.login(
        req.body.Email,
        req.body.Password,
    );
    if (user.status == "ok") {
        console.log(user.id);
        res.cookie("tokenUser", user.id, { httpOnly: true });
        res.redirect("/panel");
    } else {
        res.redirect("/login");
    }
});

router.get("/panel", async (req, res) => {
    const token = req.cookies.tokenUser;
    console.log("token", token);
    if (token) {
      res.render("inicio", { title: "Express" });
    } else {
      res.redirect("/login");
    }
});

router.get("/productos", async (req, res) => {
     const product =  await ProductsDb.getAll();
     console.log("lalaproducts " , product[0][0]);
     res.render("productos", { title: "Express" , products : product});
});

router.get("/categorias" , async (req,res) => {
    const categorie = await ProductsDb.getAllCategories();
    res.render("categorias" , {tittle : "express" , categories :categorie})
});

router.get("/productosporcategoria/:id", async(req,res)=> {  
    console.log("param" , req.params.id);
    const producto = await ProductsDb.getAllProductsByCategorie(req.params.id);
    res.render("productos" , {tittle : "express" , products : producto})
});

router.get("/VerProducto/:id", async(req,res)=> {  
    console.log("param" , req.params.id);
    const producto = await ProductsDb.getByID(req.params.id);
    console.log(producto);
    res.render("VerProducto" , {tittle : "express" , producto1 : producto})
});

  router.post("/AddCarrito/:idProducto", async(req,res)=> {  
    const token = req.cookies.tokenUser;
    console.log("para" , token);
    const data = await CarritoDb.AddCarrito_Producto (
    token , 
    req.params.idProducto ,
    req.body.Cantidad);
    if (data.status == "ok") {
        res.redirect("/VerCarrito");
    } else {
        res.redirect("/productos");
    }
  })

  router.post("/verifyUpdate/:idProducto", async(req,res)=> {  
    const token = req.cookies.tokenUser;
    console.log("comidaaaaaaaaaaaaaaaa",token);
    const data = await CarritoDb.updateProductsByID(token , req.params.idProducto , req.body.Cantidad);
    console.log("comidaaaaaaaaaaaaaaaa",data);
    if (data.status == "ok") {
        res.redirect("/VerCarrito");
    } else {
        res.redirect("/VerCarrito");
    }
  })

  router.post("/verifyPedido", async(req,res)=> {  
    const token = req.cookies.tokenUser;
    const data = await UsuarioDb.CreatePedido (
    token , 
    req.body.Ciudad,
    req.body.Direccion,
    );
    if (data.status == "ok") {
        res.redirect("/HacerPedido?msg=ok");
    } else {
        res.redirect("/HacerPedido?msg=err");
    }
  })

  router.get("/VerCarrito", async(req,res)=> {  
    const token = req.cookies.tokenUser;
    const producto = await CarritoDb.getAllProducts(token);
    console.log(producto);
    res.render("VerCarrito" , {tittle : "express" , products : producto})
  })

  router.get("/VerPedidos", async(req,res)=> {  
    const token = req.cookies.tokenUser;
    const pedido = await UsuarioDb.getAllPedidos(token);
    console.log("pedidosssssssssss" , pedido);
    res.render("VerPedidos" , {tittle : "express" , pedidos : pedido})
  })

  router.get("/DeleteProductdeCarrito/:id", async(req,res)=> {  
    const token = req.cookies.tokenUser;
    const producto = await CarritoDb.deleteProductsByID(token ,req.params.id);
    console.log(producto);
    res.rendirect("VerCarrito" , {tittle : "express"})
  })



module.exports = router;
