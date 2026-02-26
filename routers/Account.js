import express from "express"
import { Login, register } from "../controllers/useraccount.js";
const router=express.Router();
router.post("/login",Login);
router.post("/signup",register)
export default router