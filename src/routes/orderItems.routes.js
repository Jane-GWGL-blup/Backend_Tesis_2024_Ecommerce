import { Router } from "express";
import { createOrderItem,deleteOrdenItems,getOrderItemById, getOrderItems, updateOrderItems } from "../controllers/orderItems.controllers.js";

const router = Router()

// crea un nuevo OrderItem
router.post('/order-items', createOrderItem)

// Obtener los items de una orden especifica
router.get('/order-items/:id',getOrderItemById)

//listadop
router.get('/order-items', getOrderItems)

//eliminacion
router.delete('/order-items/:id', deleteOrdenItems)

//actualizacion
router.put('/order-items/:id', updateOrderItems)

export default router