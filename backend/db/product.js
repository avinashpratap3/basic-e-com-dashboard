const mongoose=require("mongoose")


const productschema=mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userid:String,
    company:String,
});
module.exports=mongoose.model("product",productschema);