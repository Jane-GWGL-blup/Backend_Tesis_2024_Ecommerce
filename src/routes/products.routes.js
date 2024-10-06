import { Router } from "express";
import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from "../controllers/products.controllers.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

//Rutas abiertas a todos los usuarios y administradores
// Listado de los productos
router.get('/products', getProducts);
// Busqueda de producto por id
router.get('/products/:id', getProductsById)

//Rutas solo accesible para Admin
// Creacion de nuevo producto
router.post('/products', authenticateToken, authorizeRoles(['ADMIN']), createProducts)
// Eliminacion de productos
router.delete('/products/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteProducts)
// Actualizacion de productos
router.put('/products/:id', authenticateToken, authorizeRoles(['ADMIN']), updateProducts)

export default router;