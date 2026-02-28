import addToCart from "../models/addtocart.js";

export const Add = async (req, res) => {
    try {
        const email = req.email;
        const { productname } = req.body;


        let userCart = await addToCart.findOne({ useremail: email });
        if (!productname) {
    return res.json({
        sucess: false,
        message: "Product name missing!"
    });
}

if (!email) {
    return res.json({
        sucess: false,
        message: "User email missing!"
    });
}
        
        if (userCart) {
            let itemFound = false;

            userCart.product = userCart.product.map(item => {
                if (item.name === productname) {
                    item.quantity += 1;   // quantity increment
                    itemFound = true;
                }
                return item;
            });

            if (!itemFound) {
                userCart.product.push({
                    name: productname,
                    quantity: 1
                });
            }

            await userCart.save(); 

            return res.json({ sucess: true, message: "Product updated" });
        }

        const newCart = new addToCart({
            useremail: email,
            product: [{ name: productname, quantity: 1 }]
        });

        await newCart.save();

        return res.json({ sucess: true, message: "Product added" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Server error while adding item" ,err:error,email:email});
    }
};


export const Sub = async (req, res) => {
    try {
        const email = req.email;
        const { productname } = req.body;
        if (!productname) {
    return res.json({
        sucess: false,
        message: "Product name missing!"
    });
}

if (!email) {
    return res.json({
        sucess: false,
        message: "User email missing!"
    });
}


        let userCart = await addToCart.findOne({ useremail: email });

        
        if (userCart) {
          

            userCart.product = userCart.product.map(item => {
                if (item.name === productname) {
                    item.quantity -= 1; 
                    
                }
                return item;
            }).filter((item)=>{
                if(item.quantity>0){
                    return item
                }
            });

          if(userCart.product)

            await userCart.save(); 

            return res.json({ sucess: true, message: "Product sub updated" });
        }

    

        return res.json({ sucess: true, message: "Product subtrac" });

    } catch (error) {
        console.log(error);
        return res.json({ sucess: false, message: "Server error while adding item" });
    }
};