import { Router } from "express";
import fs from "fs"

const router = Router();

// La ruta POST  /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
// product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
// quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno. Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto



export default router