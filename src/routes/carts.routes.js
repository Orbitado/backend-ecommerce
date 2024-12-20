import { Router } from "express";
import {
  getProductsFromCartByID,
  createCart,
  addProductByID,
  deleteProductByID,
  updateAllProducts,
  updateProductByID,
  deleteAllProducts,
  getAllCarts,
} from "../controllers/carts.controller.js";
import { authenticateUser } from "../middlewares/auth-user.mid.js";
import { authorize } from "../middlewares/policies.mid.js";
const router = Router();

router.get("/", authenticateUser, authorize(["ADMIN"]), getAllCarts);
router.get(
  "/:cid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  getProductsFromCartByID
);
router.post(
  "/",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  createCart
);
router.post(
  "/:cid/product/:pid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  addProductByID
);
router.delete(
  "/:cid/product/:pid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  deleteProductByID
);
router.put(
  "/:cid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  updateAllProducts
);
router.put(
  "/:cid/product/:pid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  updateProductByID
);
router.delete(
  "/:cid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  deleteAllProducts
);

export default router;
