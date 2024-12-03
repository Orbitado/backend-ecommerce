import express from "express";
import passport from "passport";
import { userDBManager } from "../managers/user.manager.js"; // Suponiendo que tienes esta clase para la gestión de usuarios.
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken, verifyToken } from "../utils/token.util.js";

const router = express.Router();
const UserService = new userDBManager();

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  (req, res) => {
    const { _id } = req.user;
    const message = "User Registered!";
    res.status(201).json({ message, user_id: _id });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const { token } = req.user;
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
    const message = "User logged in!";
    res.cookie("token", token, opts).status(200).json({ message });
  }
);

// router.post('/signout', (req, res) => {
//   res.clearCookie('token').status(200).json({ message: "User signed out!" });
// });

// router.get('/online', (req, res) => {
//   if (req.isAuthenticated()) {
//     const { email } = req.user;
//     return res.status(200).json({ message: `${email} is online` });
//   }
//   return res.status(400).json({ message: "User is not online" });
// });

// export default router;
