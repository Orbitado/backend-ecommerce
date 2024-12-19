import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const persistence = process.env.PERSISTENCE || "mongodb";

if (!persistence) {
  throw new Error("PERSISTENCE is not defined");
}

class ProductDTO {
  constructor({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
    _id,
    createdAt,
    updatedAt,
  }) {
    this._id =
      _id ||
      (persistence !== "mongodb" && crypto.randomBytes(12).toString("hex"));
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.thumbnails = thumbnails;
    persistence !== "mongodb" && (this.createdAt = createdAt || new Date());
    persistence !== "mongodb" && (this.updatedAt = updatedAt || new Date());
  }
}

export default ProductDTO;
