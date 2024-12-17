import { Router } from "express";
import {
  getProductsFromCartByID,
  createCart,
  addProductByID,
  deleteProductByID,
  updateAllProducts,
  updateProductByID,
  deleteAllProducts,
} from "../controllers/carts.controller.js";

const router = Router();

router.get("/:cid", getProductsFromCartByID);
router.post("/", createCart);
router.post("/:cid/product/:pid", addProductByID);
router.delete("/:cid/product/:pid", deleteProductByID);
router.put("/:cid", updateAllProducts);
router.put("/:cid/product/:pid", updateProductByID);
router.delete("/:cid", deleteAllProducts);

export default router;
