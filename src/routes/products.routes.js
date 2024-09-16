import { Router } from "express";
import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from "../controllers/products.controllers.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

// Listado de los productos
router.get('/products', getProducts);

// Busqueda de producto por id
router.get('/products/:id', getProductsById)

// Creacion de nuevo producto
router.post('/products', createProducts)

// Eliminacion de productos
router.delete('/products/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteProducts)
// Actualizacion de productos
router.put('/products/:id', updateProducts)

export default router;