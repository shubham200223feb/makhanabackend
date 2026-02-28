import mongoose from "mongoose";

const addtochartschema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true      
    },

    product: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

const addToCart = mongoose.model("addToCart", addtochartschema);
export default addToCart;