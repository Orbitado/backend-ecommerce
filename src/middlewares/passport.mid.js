import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import { generateToken, verifyToken } from "../utils/token.util.js";
import userService from "../services/users.service.js";
import { sendVerificationEmail } from "../utils/nodemailer.util.js";
import crypto from "crypto";

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
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
          return done(null, false, {
            message: `El usuario con el email ${email} ya existe.`,
          });
        }

        const verifyCode = crypto.randomBytes(6).toString("hex");
        const hashedPassword = hashPassword(password);
        const newUser = await userService.createUser({
          ...req.body,
          password: hashedPassword,
          verifyCode,
          isVerified: false,
        });

        await sendVerificationEmail(newUser, verifyCode);

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
      try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
          const info = {
            message: `Usuario con el email ${email} no encontrado.`,
            statusCode: 401,
          };
          return done(null, false, info);
        }
        console.log(password, user.password);
        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) {
          const info = { message: "Contraseña incorrecta.", statusCode: 401 };
          return done(null, false, info);
        }

        if (!user.isVerified) {
          const info = {
            message: `El usuario no ha sido verificado. Por favor, revise su bandeja de entrada de su correo electronico: ${user.email}`,
            statusCode: 401,
          };
          return done(null, false, info);
        }

        const userData = {
          id: user._id,
          email: user.email,
          role: user.role,
        };

        const token = generateToken(userData);
        user.token = token;
        user.active = true;
        await userService.updateUserByID(user._id, user);
        console.log("Usuario autenticado:", user);
        done(null, user);
      } catch (error) {
        console.error("Error en la estrategia de autenticación:", error);
        return done(error);
      }
    }
  )
);

passport.use(
  "signout",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (data, done) => {
      console.log(process.env.JWT_SECRET);
      try {
        console.log(data);
        const user = await userService.getUserByID(data.id);
        if (!user) {
          return done(null, false);
        }
        user.active = false;
        user.token = null;
        await userService.updateUserByID(user._id, user);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "current",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (data, done) => {
      try {
        const user = await userService.getUserByID(data.id);
        const { active } = user;
        if (!active) {
          const info = {
            message: "El usuario no esta activo.",
            statusCode: 401,
          };
          return done(null, false, info);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "verify",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "verifyCode",
      passReqToCallback: true,
    },
    async (req, email, verifyCode, done) => {
      try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
          return done(null, false, {
            message: `El usuario con el email ${email} no existe.`,
          });
        }

        if (user.isVerified) {
          return done(null, false, {
            message: `El usuario con el email ${email} ya ha sido verificado.`,
          });
        }

        if (user.verifyCode !== verifyCode) {
          return done(null, false, {
            message: `El código de verificación es incorrecto.`,
          });
        }

        user.isVerified = true;
        await userService.updateUserByID(user._id, user);

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
