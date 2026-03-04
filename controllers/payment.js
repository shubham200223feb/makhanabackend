import { instance } from "../app.js"
export const startpayment=async(req,res)=>{
const option={
    amount :10000,
    currency:"INR"
}
const order=await instance.orders.create(option);
if(!order){
    return res.status(200).json({sucess:false,message:"error while creating the order"})
}
return res.status(200).json({sucess:true ,message:"order is gentated",order:order})
}