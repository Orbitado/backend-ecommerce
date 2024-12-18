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
    return await this.ProductDAO.getAllProducts();
  }

  async getProductByID(pid) {
    return await this.ProductDAO.getProductByID(pid);
  }

  async createProduct(product) {
    product = new ProductDTO(product);
    return await this.ProductDAO.createProduct(product);
  }

  async updateProduct(pid, productUpdate) {
    return await this.ProductDAO.updateProduct(pid, productUpdate);
  }

  async deleteProduct(pid) {
    return await this.ProductDAO.deleteProduct(pid);
  }
}

const productService = new ProductService();
await productService.init();
export default productService;
