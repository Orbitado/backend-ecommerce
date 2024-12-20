import { Router } from "express";
import {
  getAllUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUser,
} from "../controllers/users.controller.js";
import { authorize } from "../middlewares/policies.mid.js";
import { authenticateUser } from "../middlewares/auth-user.mid.js";

const router = Router();

router.get("/", authenticateUser, authorize(["ADMIN"]), getAllUsers);
router.get(
  "/:uid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  getUserByID
);
router.post("/", authenticateUser, authorize(["ADMIN"]), createUser);
router.put(
  "/:pid",
  authenticateUser,
  authorize(["PUBLIC", "USER", "ADMIN"]),
  updateUserByID
);
router.delete("/:uid", authenticateUser, authorize(["ADMIN"]), deleteUser);

export default router;
