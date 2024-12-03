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
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const userAlreadyExist = await UserService.getUserByEmail(email);
        if (userAlreadyExist) {
          const info = { message: "User already exist.", statusCode: 401 };
          return done(null, false, info);
        }
        const hashedPassword = hashPassword(password);
        const user = await UserService.createUser({
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
        });
        return done(null, user);
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
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await UserService.getUserByEmail(email);
        if (!user) {
          const info = { message: "User not found.", statusCode: 401 };
          return done(null, false, info);
        }

        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) {
          const info = { message: "Invalid password.", statusCode: 401 };
          return done(null, false, info);
        }

        const userData = {
          id: user._id,
          email: user.email,
          role: user.role,
        };

        const token = generateToken(userData);
        user.token = token;
        await UserService.findByIdAndUpdate(user._id, user);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
