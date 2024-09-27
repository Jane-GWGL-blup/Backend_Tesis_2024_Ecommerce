import {Router} from 'express'
import userRoutes from './routes/users.routes.js'
import productsRoutes from './routes/products.routes.js'
import categoryRoutes from './routes/categories.routes.js'
import authRoutes from './routes/auth.routes.js'
import orderRoutes from './routes/orders.routes.js'
import orderItemRoutes from './routes/orderItems.routes.js'
import cartRoutes from './routes/carts.routes.js'
import invoiceRoutes from './routes/invoice.routes.js'
import profileRoutes from './routes/profile.routes.js'

const router = Router()
router.use('/api', userRoutes);
router.use('/api', productsRoutes);
router.use('/api', categoryRoutes);
router.use('/api', authRoutes);
router.use('/api', orderRoutes)
router.use('/api', orderItemRoutes)
router.use('/api', cartRoutes)
router.use('/api', invoiceRoutes)
router.use('/api', profileRoutes)

export default router;