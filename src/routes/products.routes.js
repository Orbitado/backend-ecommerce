import { Router } from "express";
import { authenticateUser } from "../middlewares/auth-user.mid.js";
import { authorize } from "../middlewares/policies.mid.js";
import {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get(
  "/",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  getAllProducts
);
router.get(
  "/:pid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  getProductByID
);
router.post("/", authenticateUser, authorize(["ADMIN"]), createProduct);
router.put("/:pid", authenticateUser, authorize(["ADMIN"]), updateProduct);
router.delete("/:pid", authenticateUser, authorize(["ADMIN"]), deleteProduct);

export default router;
