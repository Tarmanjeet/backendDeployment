let {validationResult}=require("express-validator");
let products=require("../db/models/product");
let mongoose=require("mongoose");

let ObjectId = mongoose.Types.ObjectId;

let getAllProducts=async(req,res)=>{
    let query={};
    let skip=req.query.skip || 0;
    let limit=req.query.limit || 5;
    let category=req.query.category;
    let minPrice=req.query.minPrice;
    let maxPrice=req.query.maxPrice;

    if(category && category!=""){
        query.category=category;
    }

    if((minPrice && minPrice>0) || (maxPrice && maxPrice>0)){
        if(minPrice && maxPrice && minPrice>maxPrice){
            return res.status(400).json({success:false,message:"minPrice can't get greater than maxPrice"});
        }
        if(minPrice && maxPrice){
            query.price={$gte:minPrice,$lte:maxPrice};
        }
        else if(minPrice && !maxPrice){
            query.price={$gte:minPrice};
        }
        else if(maxPrice && !minPrice){
            query.price={$lte:maxPrice};
        }
    }
    let allProducts=await products.find(query).skip(skip).limit(limit);
    return res.status(200).json({success:true,message:"Products fetched successfully",data:allProducts});
}

let getProductById=async(req,res)=>{
    let productId=req.params.id;
    if (!ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    let product=await products.findById(productId);
    if(!product){
        return res.status(404).json({success:false,message:"Product not found"});
    }
    return res.status(200).json({success:true,message:"Product fetched successfully",data:product});
}

let createProduct=async(req,res)=>{
    let body=req.body;
    let newProduct={
        name:body.name,
        desc:body.desc,
        price:body.price,
        category:body.category,
        imgUrl:body.imgUrl
    }
    await products.insertOne(newProduct);
    if(!newProduct.name || !newProduct.desc || !newProduct.price || !newProduct.category){
        return res.status(400).json({success:false,message:"Please provide all the required fields"});
    }
    return res.status(200).json({success:true,message:"Product created successfully",data:newProduct});
}

let updateProduct=async(req,res)=>{
    let productId = req.params.id;
    let newDesc = req.body.desc;
    let newPrice = req.body.price;
    let product = await products.findById(productId)
    if(newDesc && newDesc != "")
    {
        product.desc = newDesc
    }
    if(newPrice && newPrice > 0)
    {
        product.price = newPrice
    }
    await product.save()
    res.status(200).json({success:true,message:"Product Updated successfully"})
}

let deleteProduct=async(req,res)=>{
    let productId = req.params.id;
    await products.deleteOne({_id:new ObjectId(productId)});
    res.status(200).json({success:true,message:"Product Deletd successfully"});
}

module.exports={
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}