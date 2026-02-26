import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    name:{
        type:String,
       require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})
const Users= mongoose.model("Users",userschema);
export default Users