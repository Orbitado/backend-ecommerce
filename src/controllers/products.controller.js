import ProductService from "../services/products.service.js";
import { uploader } from "../utils/multer.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await ProductService.getAllProducts(req.query);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getProductByID = async (req, res) => {
  try {
    const result = await ProductService.getProductByID(req.params.pid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

export const createProduct = [
  uploader.array("thumbnails", 3),
  async (req, res) => {
    if (req.files) {
      req.body.thumbnails = req.files.map((file) => file.path);
    }

    try {
      const result = await ProductService.createProduct(req.body);
      res.send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  },
];

export const updateProduct = [
  uploader.array("thumbnails", 3),
  async (req, res) => {
    if (req.files) {
      req.body.thumbnails = req.files.map((file) => file.filename);
    }

    try {
      const result = await ProductService.updateProduct(
        req.params.pid,
        req.body
      );
      res.send({
        status: "success",
        payload: result,
      });
    } catch (error) {
      res.status(400).send({
        status: "error",
        message: error.message,
      });
    }
  },
];

export const deleteProduct = async (req, res) => {
  try {
    const result = await ProductService.deleteProduct(req.params.pid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};
