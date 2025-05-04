const express=require("express");
const {check}=require("express-validator");
const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}=require("../controllers/product.controller");
let productRouter=express.Router();

productRouter.get("/",getAllProducts);

productRouter.post("/create",createProduct);

productRouter.get("/:id",getProductById);

productRouter.patch("/update/:id",updateProduct);

productRouter.delete("/delete/:id",deleteProduct);

module.exports=productRouter;