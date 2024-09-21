import {Router} from "express"
import { authenticateToken } from "../middlewares/auth.middleware.js"
import {getInvoiceById,getInvoicesByUser } from '../controllers/invoices.controllers.js' 

const router = Router()

//obtener una factura especifica por su id
router.get('/invoices/:id',authenticateToken,getInvoiceById)

//obtener todas las facturas de un usuario
router.get('/invoices',authenticateToken,getInvoicesByUser)

export default router;