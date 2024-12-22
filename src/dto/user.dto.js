import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const persistence = process.env.PERSISTENCE || "mongodb";

if (!persistence) {
  throw new Error("PERSISTENCE is not defined");
}

class UserDTO {
  constructor({
    _id,
    first_name,
    last_name,
    email,
    age,
    password,
    cart,
    role,
    isVerified,
    verifyCode,
    active,
    token,
    createdAt,
    updatedAt,
  }) {
    this._id =
      _id ||
      (persistence !== "mongodb"
        ? crypto.randomBytes(12).toString("hex")
        : undefined);
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.age = age;
    this.password = password;
    this.cart = cart || null;
    this.role = role || "USER";
    this.isVerified = isVerified || false;
    this.verifyCode = verifyCode;
    this.active = active || false;
    this.token = token;
    persistence !== "mongodb" && (this.createdAt = createdAt || new Date());
    persistence !== "mongodb" && (this.updatedAt = updatedAt || new Date());
  }
}

export default UserDTO;
