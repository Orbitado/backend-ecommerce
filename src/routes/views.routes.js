import { Router } from "express";
import { productDBManager } from "../managers/productDBManager.js";

const router = Router();

const ProductService = new productDBManager();

router.get("/", async (req, res) => {
  const products = await ProductService.getAllProducts();
  res.render("home", { products });
});

router.get("/realTimeProducts", async (req, res) => {
  const products = await ProductService.getAllProducts(req.query);
  res.render("realTimeProducts", { products });
});

export default router;
