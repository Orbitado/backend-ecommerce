import { Router } from "express";
import fs from "fs"

const router = Router();

const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

// La ruta raíz get deberá listar todos los productos de la base de datos.
router.get('/', (req, res) => {
    res.json(products);
})

// La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await products.find(product => product.id == pid);

    if(!product) {
        res.status(404).json({ error: 'No se encuentra el producto con el id solicitado' })
    } else {
        res.json(product);
    }
})

// La ruta raíz POST / deberá agregar un nuevo producto a la base de datos.
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category } = req.body;
    const newId = products[products.length - 1].id + 1;

    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' })
    } else {
            const newProduct = {
                id: newId,
                title,
                description,
                code,
                price,
                status: true,
                stock,
                category
            }

            products.push(newProduct);
            fs.writeFileSync('./data/products.json', JSON.stringify(products, null, '\t'));
        }
        res.json(products); 
} 
)

export default router