import jwt from "jsonwebtoken";

function generateToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
}
