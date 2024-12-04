import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
// import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt"; ESO MAS ADELANTE
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken, verifyToken } from "../utils/token.util.js";
import { userDBManager } from "../managers/user.manager.js";

const UserService = new userDBManager();

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const existingUser = await UserService.getUserByEmail(email);
        if (existingUser) {
          return done(null, false, {
            message: `El usuario con el email ${email} ya existe.`,
          });
        }

        const hashedPassword = hashPassword(password);
        const newUser = await UserService.createUser({
          ...req.body,
          password: hashedPassword,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      console.log("Intento de inicio de sesión con email:", email);
      console.log("Intento de inicio de sesión con password:", password);
      try {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
          const info = {
            message: `Usuario con el email ${email} no encontrado.`,
            statusCode: 401,
          };
          return done(null, false, info);
        }

        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) {
          const info = { message: "Contraseña incorrecta.", statusCode: 401 };
          return done(null, false, info);
        }

        const userData = {
          id: user._id,
          email: user.email,
          role: user.role,
        };

        const token = generateToken(userData);
        user.token = token;
        const updatedUser = await UserService.updateUserByID(user._id, user);
        console.log("Token generado:", token);
        console.log("Usuario autenticado:", updatedUser);
        return done(null, updatedUser);
      } catch (error) {
        console.error("Error en la estrategia de autenticación:", error);
        return done(error);
      }
    }
  )
);

export default passport;
