import {
    Router
} from "express"

import {
    deleteOrders,
    getOrders,
    getOrdersById,
    updateOrders,
    createOrder,
    payForOrder
} from "../controllers/orders.controllers.js"

import {
    authenticateToken,
    authorizeRoles
} from '../middlewares/auth.middleware.js'

const router = Router();

//Ruta solo accesible para Admin 
// Listado
router.get('/orders', authenticateToken,  getOrders);


//Ruta accesible para los usuarios autenticados
//Creacion de ordenes
router.post('/orders/create', authenticateToken, createOrder);
// busqueda por id
router.get('/orders/:id', authenticateToken, getOrdersById);
// Eliminacion
router.delete('/orders/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteOrders);
//actualizacion
router.put('/orders/:id',authenticateToken, authorizeRoles(['ADMIN']), updateOrders);

// Simular el pago de la orden
router.post('/orders/:id/pay', authenticateToken, payForOrder);

export default router;