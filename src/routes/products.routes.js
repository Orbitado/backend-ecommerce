import { Router } from "express";
import fs from "fs"

const router = Router();
// La ruta raíz get deberá listar todos los productos de la base de datos.

const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

router.get('/', (req, res) => {
    res.json(products);
})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await products.find(product => product.id == pid);

    if(!product) {
        res.status(404).json({ error: 'No se encuentra el producto con el id solicitado' })
    } else {
        res.json(product);
    }
})

export default router