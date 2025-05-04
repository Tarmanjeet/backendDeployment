const express=require("express");
const dotenv=require("dotenv").config();
const bodyParser=require("body-parser");
const userRouter=require("./router/user.router");
const productRouter=require("./router/product.router");
const mongoose=require("./db/connection");

const app=express();
app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/",(req,res)=>{
    res.status(200).send("Application is running");
})
app.use((req,res)=>{
    res.status(404).send(`
        <html>
        <head>
        <title>404</title>
        </head>
        <body>
        <h1>PAGE NOT FOUND</h1>
        </body>
        </html>`)
})
app.listen(6000,(err)=>{
    if(err) console.log("err",err);
    console.log("server listening on 6000");
})