import { Router } from "express";
import {
  getAllUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:uid", getUserByID);
router.post("/", createUser);
router.put("/:pid", updateUserByID);
router.delete("/:uid", deleteUser);

export default router;
