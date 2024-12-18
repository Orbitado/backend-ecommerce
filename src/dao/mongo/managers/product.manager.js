import productModel from "../models/products.model.js";

class productDBManager {
  async getAllProducts() {
    const products = await productModel.find();
    return products;
  }

  async getProductByID(pid) {
    const product = await productModel.findOne({ _id: pid });

    if (product === null) {
      throw new Error(`El producto ${pid} no existe!`);
    }

    if (typeof product === "undefined") {
      throw new Error(
        "Error al obtener el producto por ID. Verificar que el ID sea correcto."
      );
    }

    if (product === undefined) {
      throw new Error(
        "Error al obtener el producto por ID. Verificar que el ID sea correcto."
      );
    }

    return product;
  }

  async createProduct(product) {
    const { title, description, code, price, stock, category, thumbnails } =
      product;

    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error("Error al crear el producto");
    }

    return await productModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });
  }

  async updateProduct(pid, productUpdate) {
    return await productModel.updateOne({ _id: pid }, productUpdate);
  }

  async deleteProduct(pid) {
    const result = await productModel.deleteOne({ _id: pid });

    if (result.deletedCount === 0)
      throw new Error(`El producto ${pid} no existe!`);

    return result;
  }
}

export { productDBManager };
