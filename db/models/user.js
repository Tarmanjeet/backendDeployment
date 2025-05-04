const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    type:{
        type:Number,
        default:0,
        enum:[0,1]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})
module.exports=mongoose.model("users",userSchema)