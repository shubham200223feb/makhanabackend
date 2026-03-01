import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config();
const app= express();
const port=process.env.PORT;
import database from "./lib/database.js";





import Accountrouter from "./routers/Account.js";
import Cart from "./routers/Addtocart.js";
import  Product from "./routers/Addproduct.js"
import { addproduct } from "./controllers/Product.js";
import Listofproduct from "./routers/buy.js"



app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
  origin: 'https://makhana-0nl6.onrender.com', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})
)
app.use("/api/user",Accountrouter);
app.use("/api/cart",Cart);;
app.use("/api/",Product);
app.use("/api/cart",Listofproduct)



app.listen(port,()=>{
    database()
    console.log(`server is listeing at ${port}`)
})
