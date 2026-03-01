import Product from "../models/product.js";

export const addproduct =async(req ,res)=>{
    try{
        const {name,price,url}= req.body;
        const data= await Product ({name:name,price:price,url:url});
        await data.save();
        return res.status(201).send({success:true,messages:"product is added sucessfully"})

    }catch(error){
console.log("error while addeing the element in database ,error ",error);
return res.status(500).send({success:false, messages:"error while addeding data in product tabel"})
    }
};
