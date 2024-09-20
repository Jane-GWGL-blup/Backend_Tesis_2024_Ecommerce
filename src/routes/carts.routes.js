import {Router} from 'express'
import { getCart,addItemToCart,updateCartItemQuantity,removeItemFromCart,clearCart } from '../controllers/carts.controllers.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'// Asegurarse de que el usuario esté autenticado

const router = Router()

router.get('/cart',authenticateToken,getCart) // Obtener el carrito
router.post('/cart',authenticateToken,addItemToCart); // Agregar un producto al carrito
router.put('/cart', authenticateToken,updateCartItemQuantity) //actualizar la cantidad de un item
router.delete('/cart', authenticateToken,removeItemFromCart) //Eliminar un item del carrito
router.post('/cart/clear',authenticateToken, clearCart); // Vaciar el carrito

export default router


