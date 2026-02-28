import addToCart from "../models/addtocart.js";

export const Add = async (req, res) => {
    try {
        const email = req.email;
        const { productname } = req.body;


        let userCart = await addToCart.findOne({ useremail: email });

        
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

            return res.json({ success: true, message: "Product updated" });
        }

        const newCart = new addToCart({
            useremail: email,
            product: [{ name: productname, quantity: 1 }]
        });

        await newCart.save();

        return res.json({ success: true, message: "Product added" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Server error while adding item" });
    }
};


export const Sub = async (req, res) => {
    try {
        const email = req.email;
        const { productname } = req.body;


        let userCart = await addToCart.findOne({ useremail: email });

        
        if (userCart) {
          

            userCart.product = userCart.product.map(item => {
                if (item.name === productname) {
                    item.quantity -= 1;  itemFound = true;
                }
                return item;
            });

          

            await userCart.save(); 

            return res.json({ success: true, message: "Product sub updated" });
        }

    

        return res.json({ success: true, message: "Product subtrac" });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Server error while adding item" });
    }
};