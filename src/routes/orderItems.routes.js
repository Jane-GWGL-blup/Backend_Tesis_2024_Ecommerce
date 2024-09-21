import { Router } from "express";
import { createOrderItem,deleteOrdenItems,getOrderItemById, getOrderItems, updateOrderItems } from "../controllers/orderItems.controllers.js";
import { authenticateToken, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router()

//los usuarios autenticados pueden ver sus propios orderItems
// Obtener los items de una orden especifica
router.get('/order-items/:id',authenticateToken,getOrderItemById)

// Solo ADMIN puede crear, actualizar y eliminar OrderItems
// crea un nuevo OrderItem
router.post('/order-items', authenticateToken, createOrderItem)

//listado
router.get('/order-items', authenticateToken, getOrderItems)

//eliminacion
router.delete('/order-items/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteOrdenItems)

//actualizacion
router.put('/order-items/:id', authenticateToken, authorizeRoles(['ADMIN']), updateOrderItems)

export default router