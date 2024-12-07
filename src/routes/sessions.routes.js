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
    res.status(500).json({
      message: "Error interno al registrar el usuario.",
      error: error.message,
    });
  }
});

router.post("/login", passportCb("login"), async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos." });
    }

    res
      .cookie("token", user.token, { httpOnly: true })
      .status(200)
      .json({ message: "Sesión iniciada exitosamente.", user });
  } catch (error) {}
});

router.post("/signout", passportCb("signout"), async (req, res) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ message: "Sesión cerrada exitosamente." });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al cerrar la sesión.",
      error: error.message,
    });
  }
});

router.post("/current", passportCb("current"), async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(400)
        .json({ message: "No se pudo obtener el usuario actual." });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Error interno al obtener el usuario actual.",
      error: error.message,
    });
  }
});

export default router;
