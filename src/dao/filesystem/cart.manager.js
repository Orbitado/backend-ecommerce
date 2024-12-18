import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { productFSManager } from "./product.manager.js";

class CartFSManager {
  constructor() {
    this.productFSManager = new productFSManager();
    this.filePath = path.resolve("./src/dao/filesystem/files/carts.json");
  }

  // Leer archivo JSON
  async _readFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        // Si el archivo no existe, inicializamos una estructura vacía
        await fs.writeFile(this.filePath, JSON.stringify([]));
        return [];
      }
      throw new Error("Error al leer el archivo de carritos.");
    }
  }

  // Escribir datos en el archivo JSON
  async _writeFile(data) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      throw new Error("Error al escribir en el archivo de carritos.");
    }
  }

  async getAllCarts() {
    const carts = await this._readFile();
    return carts;
  }

  async getProductsFromCartByID(cid) {
    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cid);

    if (!cart) {
      throw new Error(`El carrito ${cid} no existe!`);
    }

    return cart;
  }

  async createCart() {
    const carts = await this._readFile();
    const newCart = {
      _id: crypto.randomBytes(12).toString("hex"),
      products: [],
    };

    carts.push(newCart);
    await this._writeFile(carts);

    return newCart;
  }

  async addProductByID(cid, pid) {
    await this.productFSManager.getProductByID(pid);

    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cid);

    if (!cart) {
      throw new Error(`El carrito ${cid} no existe!`);
    }

    let i = null;
    const result = cart.products.filter((item, index) => {
      if (item.product === pid) i = index;
      return item.product === pid;
    });

    if (result.length > 0) {
      cart.products[i].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this._writeFile(carts);
    return cart;
  }

  async deleteProductByID(cid, pid) {
    await this.productFSManager.getProductByID(pid);

    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cid);

    if (!cart) {
      throw new Error(`El carrito ${cid} no existe!`);
    }

    const newProducts = cart.products.filter((item) => item.product !== pid);
    cart.products = newProducts;

    await this._writeFile(carts);
    return cart;
  }

  async updateAllProducts(cid, products) {
    // Validar si los productos existen
    for (let key in products) {
      await this.productFSManager.getProductByID(products[key].product);
    }

    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cid);

    if (!cart) {
      throw new Error(`El carrito ${cid} no existe!`);
    }

    cart.products = products;
    await this._writeFile(carts);
    return cart;
  }

  async updateProductByID(cid, pid, quantity) {
    if (!quantity || isNaN(parseInt(quantity))) {
      throw new Error(`La cantidad ingresada no es válida!`);
    }

    await this.productFSManager.getProductByID(pid);

    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cid);

    if (!cart) {
      throw new Error(`El carrito ${cid} no existe!`);
    }

    const i = cart.products.findIndex((item) => item.product === pid);

    if (i === -1) {
      throw new Error(`El producto ${pid} no existe en el carrito ${cid}!`);
    }

    cart.products[i].quantity = parseInt(quantity);
    await this._writeFile(carts);
    return cart;
  }

  async deleteAllProducts(cid) {
    const carts = await this._readFile();
    const cart = carts.find((c) => c._id === cid);

    if (!cart) {
      throw new Error(`El carrito ${cid} no existe!`);
    }

    cart.products = [];
    await this._writeFile(carts);
    return cart;
  }
}

export { CartFSManager };
