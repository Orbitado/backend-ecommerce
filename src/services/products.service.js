import { productDBManager } from "../managers/product.manager.js";

const ProductService = new productDBManager();

export const createProduct = (product) => ProductService.createProduct(product);

export const updateProduct = (pid, productUpdate) =>
  ProductService.updateProduct(pid, productUpdate);

export const deleteProduct = (pid) => ProductService.deleteProduct(pid);

export const getAllProducts = () => ProductService.getAllProducts();

export const getProductByID = (pid) => ProductService.getProductByID(pid);

export default ProductService;
