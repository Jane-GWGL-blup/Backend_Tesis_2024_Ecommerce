import express from 'express'
import { PORT } from './config.js'
import userRoutes from './routes/users.routes.js'
import productsRoutes from './routes/products.routes.js'
import categoryRoutes from './routes/categories.routes.js'
import authRoutes from './routes/auth.routes.js'
import orderRoutes from './routes/orders.routes.js'
import orderItemRoutes from './routes/orderItems.routes.js'

import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes)
app.use('/api', orderItemRoutes)

app.listen(PORT)
console.log("Server on port",PORT)

