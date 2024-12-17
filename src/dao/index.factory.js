import dotenv from "dotenv";

dotenv.config();

const persistence = process.env.PERSISTENCE || "mongodb"; // Valor por defecto: mongodb

export const getProductDAO = async () => {
  switch (persistence) {
    case "mongodb": {
      const { productDBManager } = await import(
        "./mongo/managers/product.manager.js"
      );
      return new productDBManager();
    }
    case "filesystem": {
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
      const { userDBManager } = await import(
        "./mongo/managers/user.manager.js"
      );
      return new userDBManager();
    }
    case "filesystem": {
      const { userFSManager } = await import("./filesystem/user.manager.js");
      return new userFSManager();
    }
    default:
      throw new Error(`Tipo de persistencia '${persistence}' no soportado.`);
  }
};

export const getCartDAO = async () => {
  switch (persistence) {
    case "mongodb": {
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
