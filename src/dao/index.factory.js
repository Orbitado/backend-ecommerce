import dotenv from "dotenv";
import { connectDb } from "../utils/mongoose.js";

dotenv.config();

const persistence = process.env.PERSISTENCE || "mongodb";

if (!persistence) {
  throw new Error("PERSISTENCE is not defined");
}

export const getProductDAO = async () => {
  switch (persistence) {
    case "mongodb": {
      connectDb();
      const { productDBManager } = await import(
        "./mongo/managers/product.manager.js"
      );
      return new productDBManager();
    }
    case "filesystem": {
      console.log("Connected to filesystem");
      const { productFSManager } = await import(
        "./filesystem/product.manager.js"
      );
      return new productFSManager();
    }
    default:
      throw new Error(`Tipo de persistencia '${persistence}' no soportado.`);
  }
};

export const getUserDAO = async () => {
  switch (persistence) {
    case "mongodb": {
      connectDb();
      const { userDBManager } = await import(
        "./mongo/managers/user.manager.js"
      );
      return new userDBManager();
    }
    case "filesystem": {
      const { UserFSManager } = await import("./filesystem/user.manager.js");
      return new UserFSManager();
    }
    default:
      throw new Error(`Tipo de persistencia '${persistence}' no soportado.`);
  }
};

export const getCartDAO = async () => {
  switch (persistence) {
    case "mongodb": {
      connectDb();
      const { CartDBManager } = await import(
        "./mongo/managers/cart.manager.js"
      );
      return new CartDBManager();
    }
    case "filesystem": {
      const { CartFSManager } = await import("./filesystem/cart.manager.js");
      return new CartFSManager();
    }
    default:
      throw new Error(`Tipo de persistencia '${persistence}' no soportado.`);
  }
};
