import mongoose from "mongoose";
const database=async()=>{
const data=await mongoose.connect(process.env.MONGURL);
console.log("host id  of mongooes",data.connection.host);
};
export default database