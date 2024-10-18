import { Router } from "express";
import { createDiscount, getDiscounts, updateDiscount, deleteDiscount,getDiscountById } from "../controllers/discounts.controllers.js";
import { authenticateToken, authorizeRoles } from '../middlewares/auth.middleware.js';
import { getDiscountByCode } from "../services/discounts.services.js";

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

// Obtener descuento por código
router.get('/discounts/code/:code', authenticateToken, async (req, res) => {
    const { code } = req.params;
    try {
      const discount = await getDiscountByCode(code);
      if (!discount) {
        return res.status(404).json({ message: 'Discount code not found' });
      }
      res.json(discount);
    } catch (error) {
      console.error('Error fetching discount by code:', error);
      res.status(500).json({ message: 'Error fetching discount' });
    }
  });

export default router;