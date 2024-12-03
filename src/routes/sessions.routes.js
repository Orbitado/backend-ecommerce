import express from "express";
import passport from "passport";
import { userDBManager } from "../managers/user.manager.js"; // Suponiendo que tienes esta clase para la gestión de usuarios.
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken, verifyToken } from "../utils/token.util.js";
import { passportCb } from "../middlewares/cb-passport.mid.js";

const router = express.Router();
const UserService = new userDBManager();

router.post("/register", passportCb("register"), async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Error al registrar el usuario." });
    }

    res.status(201).json({ message: "Usuario registrado exitosamente.", user });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error interno al registrar el usuario.",
        error: error.message,
      });
  }
});

export default router;
