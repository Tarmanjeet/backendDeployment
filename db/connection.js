const mongoose=require("mongoose");

const mongoUrl="mongodb://localhost:27017";
mongoose.connect(mongoUrl)
.then(()=>console.log("Connected to Database"));