var express = require("express");
var router = express.Router();
const ProductsController = require("../controllers/ProductsController");
const ProductsDb = new ProductsController();

router.get("/products", async (req, res) => {
    const output = ProductsDb.getAll();
    console.log(output);
    res.render('products-report', {data : output})
});

router.get('/products/create/', async (req, res) => {
    res.render('create-product')
});

router.post('/products/create/', async (req, res) => {
    var form_data = req.body;

    var nombre = form_data.nombre;
    var img = form_data.img;
    var precio = form_data.precio;
    var talla = form_data.talla;
    var para = form_data.para;
    var stock = form_data.stock;
    var categoria = form_data.categoria;

    ProductsDb.createProduct(nombre,img,precio,talla,para,stock,categoria);
    res.redirect('/products');

});

router.get('/products/update/:ID', async (req, res) => {
    const output = ProductsDb.getByID(ID);
    res.render('update-product',{data : output})
});

router.post('/products/update/:ID', async (req, res) => {
    const output = ProductsDb.getAll();

    var form_data = req.body;

    var nombre = form_data.nombre;
    var img = form_data.img;
    var precio = form_data.precio;
    var talla = form_data.talla;
    var para = form_data.para;
    var stock = form_data.stock;
    var categoria = form_data.categoria;

    ProductsDb.updateProduct();
    res.redirect('/products');
});

module.exports = router;