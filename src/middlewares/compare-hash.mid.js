import { comparePassword } from "../utils/hash.util.js";
import { userDBManager } from "../managers/user.manager.js";

const UserService = new userDBManager();

export const comparePasswordMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    const dbPassword = user.password;
    const isValidPassword = comparePassword(password, dbPassword);
    if (!isValidPassword) {
      return res.status(400).send({
        status: "error",
        message: "Contraseña incorrecta.",
      });
    }
    return next();
  } catch (error) {
    return res.status(401).send({
      status: "Error comparando la contraseña.",
      message: error.message,
    });
  }
};
