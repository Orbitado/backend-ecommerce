import { Router } from "express";
import fs from "fs"

const router = Router();
// La ruta raíz get deberá listar todos los productos de la base de datos.

const products = await fs.promises.readFile('./data/products.json', 'utf-8');
console.log(products)

router.get('/', (req, res) => {
    res.json(products);
})

router.get('/:pid', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id == id);

    if(!product) {
        res.status(404).json({ error: 'No se encuentra el producto con el id solicitado' })
    } else {
        res.json(product);
    }
})

export default Router