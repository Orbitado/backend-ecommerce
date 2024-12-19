import { getCartDAO } from "../dao/index.factory.js";
import CartDTO from "../dto/carts.dto.js";

class CartService {
  constructor() {
    this.CartDAO = null;
  }

  async init() {
    this.CartDAO = await getCartDAO();
  }

  async getAllCarts() {
    return await this.CartDAO.getAllCarts();
  }

  async getProductsFromCartByID(cid) {
    return await this.CartDAO.getProductsFromCartByID(cid);
  }

  async createCart() {
    const cart = await this.CartDAO.createCart();
    return new CartDTO(cart);
  }

  async addProductByID(cid, pid) {
    return await this.CartDAO.addProductByID(cid, pid);
  }

  async deleteProductByID(cid, pid) {
    return await this.CartDAO.deleteProductByID(cid, pid);
  }

  async updateAllProducts(cid, products) {
    return await this.CartDAO.updateAllProducts(cid, products);
  }

  async updateProductByID(cid, pid, quantity) {
    return await this.CartDAO.updateProductByID(cid, pid, quantity);
  }

  async deleteAllProducts(cid) {
    return await this.CartDAO.deleteAllProducts(cid);
  }
}

const cartService = new CartService();
await cartService.init();
export default cartService;
