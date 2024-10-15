import { Router } from "express";
import { createDiscount, getDiscounts, updateDiscount, deleteDiscount,getDiscountById } from "../controllers/discounts.controllers.js";
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// Ruta para crear un nuevo descuento
router.post('/discounts', authenticateToken, authorizeRoles(['ADMIN']), createDiscount);

// Ruta para obtener todos los descuentos
router.get('/discounts', authenticateToken, authorizeRoles(['ADMIN']), getDiscounts);

// Ruta para actualizar un descuento
router.put('/discounts/:id', authenticateToken, authorizeRoles(['ADMIN']), updateDiscount);

// Ruta para eliminar un descuento
router.delete('/discounts/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteDiscount);

// Ruta para obtener un descuento por ID (solo accesible para administradores)
router.get('/discounts/:id', authenticateToken, authorizeRoles(['ADMIN']), getDiscountById);

export default router;