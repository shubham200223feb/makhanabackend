import Users from "../models/user.js";
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"

export const Login=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const data =await Users.findOne({email:email});
        if(!data){
            return res.status(402).json({sucess:false ,message:"plss sign in "})
        }
        const comapare =  bcrypt.compareSync(password,data.password);
        if(!comapare){
            return res.status(402).json({sucess:false , message:"password inncort plss try again"})
        }
        const token = JWT.sign({email:email},process.env.JWTSECRET);
        res.cookie("userToken",token, {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});
        return res.status(200).json({sucess:true,message:"User Login Sucessfully" ,name:data.name,email:data.email})

    }catch(err){
        console.log(err)
return res.status(500).json({sucess:false,message:"error while login the user",error:err})
    }
    
}
export const register =async(req,res)=>{
    const{name,email,password}=req.body;
    try{
       const data =  await Users.findOne({email:email});
       if(data){
        return res.status(400).json({sucess:false,message:"Profile is already"})
       }
       const hashpassword = bcrypt.hashSync(password,10);
       const newdata =new Users({email:email,name:name,password:hashpassword});
       newdata.save();
       const token = JWT.sign({email:email},process.env.JWTSECRET);
       res.cookie("userToken",token, token, {
  httpOnly: true,
  secure: true,
  sameSite: "none"
});
       res.status(201).json({sucess:true ,message:"User is createed sucessfull" ,name:name,email:email})
       
        
    }catch(error){
        console.log("error while signup",error);
        
        return res.status(500).json({sucess:false,message:"error while signup"})
    }
}