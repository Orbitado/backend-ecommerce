import { hashPassword } from "../utils/hash.util.js";

export const hashPasswordMiddleware = async (req, res, next) => {
  try {
    let { password } = req.body;
    if (password) {
      password = await hashPassword(password);
      req.body.password = password;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
