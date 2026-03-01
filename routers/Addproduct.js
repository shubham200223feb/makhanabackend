import { addproduct } from "../controllers/Product.js";
import Product from "../models/product.js";
import express from "express";
const router= express.Router();
router.post("/product",addproduct);

export default router;
