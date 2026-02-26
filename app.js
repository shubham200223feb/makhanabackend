import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app= express();
const port=process.env.PORT;
import database from "./lib/database.js";





import Accountrouter from "./routers/Account.js"



app.use(express.json());
app.use(cookieParser())
app.use("/api/user",Accountrouter);



app.listen(port,()=>{
    database()
    console.log(`server is listeing at ${port}`)
})
