import Users from "../models/user.js";
import addToCart from "../models/addtocart.js";
import express from "express";
import jwt from "jsonwebtoken";
import { Add, Sub } from "../controllers/Cart.js";
const router=express.Router();
const isAuth=(req,res,next)=>{
try{
    const token = req.userToken;
    if(!token){
      return  res.staus(402).send({sucess:false,message:"token is not present "});
    }
    const decode =jwt.verify(token,process.env.JWTSECRET);
    if(!decode){
    return res.staus(402).send({sucess:false,message:"unAuthrizetoken"});
    }
req.email=decode.email;
next();

}catch(error){
    console.log("error while outhantication");
    return res.staus(500).send({sucess:false,message:"error while Authication the user"})
}
}
router.post("/add",Add);
router.post("/sub",Sub);
export default router