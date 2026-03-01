import mongoose from "mongoose";
const productschema =new mongoose.Schema({
    name:{
        type:String,
        require:true,
         unique: true
    },
    price:{
        type:Number,
        require:true
    },
    url:{
        type:String,
        require:true,
        
    }
});
const Product= mongoose.model("Products",productschema);
export default Product;