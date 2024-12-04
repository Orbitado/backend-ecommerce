import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

function generateToken(user) {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
}

function verifyToken(token) {
  const isValidToken = jwt.verify(token, JWT_SECRET);
  return isValidToken;
}

function finishToken(data) {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: 1 });
  return token;
}

export { generateToken, verifyToken, finishToken };
