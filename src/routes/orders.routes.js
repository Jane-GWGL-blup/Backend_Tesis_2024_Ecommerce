import {Router} from "express"
import { createOrder,deleteOrders,getOrders, getOrdersById, updateOrders } from "../controllers/orders.controllers.js"

const router = Router();

//Creacion de ordenes
router.post('/orders', createOrder);

// Listado
router.get('/orders', getOrders);

// busqueda por id
router.get('/orders/:id', getOrdersById);
export default router;

// Eliminacion
router.delete('/orders/:id', deleteOrders);

//actualizacion
router.put('/orders/:id', updateOrders);