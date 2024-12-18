import { getProductDAO } from "../dao/index.factory.js";
import ProductDTO from "../dto/products.dto.js";

class ProductService {
  constructor() {
    this.ProductDAO = null;
  }

  async init() {
    this.ProductDAO = await getProductDAO();
  }

  async getAllProducts() {
    const products = await this.ProductDAO.getAllProducts();
    return products.map((product) => new ProductDTO(product));
  }

  async getProductByID(pid) {
    const product = await this.ProductDAO.getProductByID(pid);
    return new ProductDTO(product);
  }

  async createProduct(product) {
    const newProduct = new ProductDTO(product);
    return await this.ProductDAO.createProduct(newProduct);
  }

  async updateProduct(pid, productUpdate) {
    const updatedProduct = new ProductDTO({ ...productUpdate, _id: pid });
    return await this.ProductDAO.updateProduct(pid, updatedProduct);
  }

  async deleteProduct(pid) {
    return await this.ProductDAO.deleteProduct(pid);
  }
}

const productService = new ProductService();
await productService.init();
export default productService;
