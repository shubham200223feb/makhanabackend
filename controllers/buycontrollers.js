import addToCart from "../models/addtocart.js";
import Product from "../models/product.js";

export const findproduct = async (req, res) => {
  try {
    const email = req.email;

    let producturl = [];
    let productprices = [];
    let productname = [];
    let itemnumber=[];

    const cart = await addToCart.findOne({ useremail: email });

    if (!cart || cart.product.length === 0) {
      return res.json({
        message: "product cart is empty please add item",
        sucess: false,
      });
    }

  
    for (let item of cart.product) {
      const productdetail = await Product.findOne({ name: item.name });

      if (productdetail) {
        producturl.push(productdetail.url);
        productname.push(productdetail.name);
        productprices.push(productdetail.price);
        itemnumber.push(item.quantity);
      }
    }

    return res.json({
      message: "list of product",
      sucess: true,
      url: producturl,
      name: productname,
      price: productprices,
      itemnumber:itemnumber
    });

  } catch (err) {
    console.log("error while sending product list", err);
    return res.json({
      message: "server error while sending product list",
      sucess: false,
      err: err,
    });
  }
};
export const deleteproduct = async(req,res)=>{
const email= req.email;

try{
  const{productname}= req.body
await Product.updateOne(
  {useremail : email },
  { $pull: { product: { name: productname } } }
);

return res.staus(200).send({sucess:true})
}catch(err){
  return res.staus(500).send({sucess:false,err:err,message:"error while perform delete operation"})
}
}