import fs from "fs/promises";
import path from "path";

class productFSManager {
  constructor() {
    this.filePath = path.resolve("./src/dao/filesystem/files/products.json");
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(this.filePath, JSON.stringify([]));
        return [];
      }
      throw new Error("Error al leer el archivo de productos.");
    }
  }

  async _writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error("Error al escribir en el archivo de productos.");
    }
  }

  async getAllProducts() {
    return await this._readFile();
  }

  async getProductByID(pid) {
    const products = await this._readFile();
    const product = products.find((p) => p?._id === pid);

    if (!product) {
      throw new Error(`El producto con ID ${pid} no existe.`);
    }

    return product;
  }

  async createProduct(product) {
    const {
      _id,
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
      createdAt,
      updatedAt,
    } = product;

    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error(
        "Error: Faltan campos obligatorios para crear el producto."
      );
    }

    const products = await this._readFile();
    const newProduct = {
      _id,
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails: thumbnails || [],
      createdAt,
      updatedAt,
    };

    products.push(newProduct);
    await this._writeFile(products);

    return newProduct;
  }

  async updateProduct(pid, productUpdate) {
    const products = await this._readFile();
    const index = products.findIndex((p) => p._id === pid);

    if (index === -1) throw new Error(`El producto con ID ${pid} no existe.`);

    products[index] = { ...products[index], ...productUpdate };
    await this._writeFile(products);

    return products[index];
  }

  async deleteProduct(pid) {
    const products = await this._readFile();
    const index = products.findIndex((p) => p._id === pid);

    if (index === -1) throw new Error(`El producto con ID ${pid} no existe.`);

    const [deletedProduct] = products.splice(index, 1);
    await this._writeFile(products);

    return deletedProduct;
  }
}

export { productFSManager };
