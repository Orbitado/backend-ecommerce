import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const persistence = process.env.PERSISTENCE || "mongodb";

if (!persistence) {
  throw new Error("PERSISTENCE is not defined");
}

class CartDTO {
  constructor({ products }) {
    this._id =
      products._id ||
      (persistence !== "mongodb" && crypto.randomBytes(12).toString("hex"));
    this.products = products;
    persistence !== "mongodb" && (this.createdAt = new Date());
    persistence !== "mongodb" && (this.updatedAt = new Date());
  }
}

export default CartDTO;
