import { cartDBManager } from "../dao/mongo/managers/cart.manager.js";
import { productDBManager } from "../dao/mongo/managers/product.manager.js";

const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

export const getAllCarts = () => CartService.getAllCarts();

export const getProductsFromCartByID = (cid) =>
  CartService.getProductsFromCartByID(cid);

export const createCart = () => CartService.createCart();

export const addProductByID = (cid, pid) =>
  CartService.addProductByID(cid, pid);

export const deleteProductByID = (cid, pid) =>
  CartService.deleteProductByID(cid, pid);

export const updateAllProducts = (cid, products) =>
  CartService.updateAllProducts(cid, products);

export const updateProductByID = (cid, pid, quantity) =>
  CartService.updateProductByID(cid, pid, quantity);

export const deleteAllProducts = (cid) => CartService.deleteAllProducts(cid);

export default CartService;
