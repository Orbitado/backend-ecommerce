import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env.JWT_SECRET;

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

function finishToken(token) {
  const token = jwt.sign(user, JWT_SECRET, {
    expiresIn: 1,
  });
  return token;
}

export { generateToken, verifyToken, finishToken };
