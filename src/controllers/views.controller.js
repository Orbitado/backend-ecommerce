import ProductService from "../services/products.service.js";

export const renderHomePage = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};

export const renderRealTimeProductsPage = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts(req.query);
    res.render("realTimeProducts", { products });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
};
