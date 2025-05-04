const express=require("express");
const {check}=require("express-validator");
const {registerUser,loginUser,updateUser,deleteUser}=require("../controllers/user.controller")
let userRouter=express.Router();

userRouter.post("/login",[
    check("email").notEmpty().isEmail(),
    check("password").notEmpty()
],loginUser);

userRouter.post("/register",[
    check("name").notEmpty(),
    check("email").notEmpty().isEmail(),
    check("password").notEmpty()
],registerUser);

userRouter.patch("/update/:id",updateUser);

userRouter.delete("/delete/:id",deleteUser);

module.exports=userRouter;