const express = require("express");
const router = express.Router();
const ProductsModel = require("../models/ProductsModel");
const ProductDb = new ProductsModel();
const CategorieModel = require("../models/CategoriesModel");
const CategoriesDb  = new CategorieModel;

class ProductsController {
    async getAll() {
        const resultProducts = ProductDb.getAll();
        const dataProducts = await resultProducts.catch((err) => {
            console.log("Controller" , err);
            return null;
        });
        console.log("dataProducts" , dataProducts);
        return dataProducts;
    }

    async getByID(id){
        const resultProduct = ProductDb.getByID(id);
        const dataProduct = await resultProduct.catch((err) => {
            console.log("Controller" , err);
            return null;
        });
        console.log("dataProduct" , dataProduct);
        return dataProduct;
    }

    async getAllCategories()
    {
        const resultCate = CategoriesDb.getAll();
        const dataCate = await resultCate.catch((err) => {
            console.log("controller" , err);
            return null;
        });
        console.log("getAll" , dataCate);
        return dataCate;
    }

    async getAllProductsByCategorie(id)
    {
        const resultProductsCate = CategoriesDb.getAllProductsByCategorie(id);
        const dataProductsByCate = await resultProductsCate.catch((err) => {
            console.log("controller" , err);
            return null
        });
        console.log("getProductByCateorie" . dataProductsByCate);
        return dataProductsByCate;
    }

    async searchByName (name)
    {
        const resultSearchCategorie = CategoriesDb.searchByName(name);
        const dataSearch = await resultSearchCategorie.catch((err) => {
            console.log("controller" , err);
            return null;
        })
        console.log("searchBy",dataSearch);
        return dataSearch;
    }

    async createProduct(nombre,img,precio,talla,para,stock,nomcategoria,nomproveedor)
    {
        const resultCreateProd = ProductDb.create_product(nombre,img,precio,talla,para,stock,nomcategoria,nomproveedor);
        await resultCreateProd.catch((err) => {
            console.log("controller" , err);
        })
    }

}

module.exports = ProductsController;