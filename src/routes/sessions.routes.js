import express from "express";
import { passportCb } from "../middlewares/cb-passport.mid.js";
import {
  registerUser,
  loginUser,
  signOutUser,
  getCurrentUser,
} from "../controllers/sessions.controller.js";
import { authenticateUser } from "../middlewares/auth-user.mid.js";
import { authorize } from "../middlewares/policies.mid.js";

const router = express.Router();

router.post("/register", passportCb("register"), registerUser);
router.post("/login", passportCb("login"), loginUser);
router.post("/signout", passportCb("signout"), signOutUser);
router.post(
  "/current",
  authenticateUser,
  authorize(["ADMIN"]),
  passportCb("current"),
  getCurrentUser
);

export default router;
