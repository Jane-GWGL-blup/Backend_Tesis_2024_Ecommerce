import express from 'express'
import { PORT } from './config.js'
import cors from 'cors'
import userRoutes from './routes/users.routes.js'
import productsRoutes from './routes/products.routes.js'
import categoryRoutes from './routes/categories.routes.js'
import authRoutes from './routes/auth.routes.js'
import orderRoutes from './routes/orders.routes.js'
import orderItemRoutes from './routes/orderItems.routes.js'
import cartRoutes from './routes/carts.routes.js'
import invoiceRoutes from './routes/invoice.routes.js'
import profileRoutes from './routes/profile.routes.js'



import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json());
app.use(cors({
    origin: 'https://localhost:3000', // Cambia esto a tu dominio real
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  }));
  

app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', categoryRoutes);
app.use('/api', authRoutes);
app.use('/api', orderRoutes)
app.use('/api', orderItemRoutes)
app.use('/api', cartRoutes)
app.use('/api', invoiceRoutes)
app.use('/api', profileRoutes)



app.listen(PORT)
console.log("Server on port",PORT)

