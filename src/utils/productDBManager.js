import productModel from "../models/products.model.js";

class productDBManager {
  async getAllProducts() {
    const products = await productModel.find();
    console.log(products);
    return products;
  }

  async getProductByID(pid) {
    const product = await productModel.findOne({ _id: pid });

    if (!product) throw new Error(`El producto ${pid} no existe!`);

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
