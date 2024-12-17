import { Router } from "express";
import {
  renderHomePage,
  renderRealTimeProductsPage,
} from "../controllers/views.controller.js";

const router = Router();

router.get("/", renderHomePage);
router.get("/realTimeProducts", renderRealTimeProductsPage);

export default router;
