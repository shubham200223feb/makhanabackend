import Product from "../models/product.js";
import addToCart from "../models/addtocart.js";
import express from "express";
import { findproduct } from "../controllers/buycontrollers.js";
const router= express.Router();
const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.userToken;

    if (!token) {
      return res.status(402).json({ success: false, message: "Token not present" });
    }

    const decoded = jwt.verify(token, process.env.JWTSECRET);

    if (!decoded) {
      return res.status(402).json({ success: false, message: "Unauthorized token" });
    }

    req.email = decoded.email;
    next();

  } catch (error) {
    console.log("error while authentication:", error);
    return res.status(500).json({ success: false, message: "Error during authentication" });
  }
};
router.post("/findproduct",isAuth,findproduct);

export default router;