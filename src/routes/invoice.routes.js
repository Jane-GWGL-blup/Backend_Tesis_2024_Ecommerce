import { Router } from 'express';
import { authenticateToken,authorizeRoles } from "../middlewares/auth.middleware.js"
import {getInvoiceById,getInvoicesByUser,getAllInvoices,downloadInvoicePDF } from '../controllers/invoices.controllers.js' 

const router = Router()

//obtener una factura especifica por su id
router.get('/invoices/:id',authenticateToken,getInvoiceById)

//obtener todas las facturas de un usuario
//router.get('/invoices',authenticateToken,getInvoicesByUser)

// Listar todas las facturas (solo accesible para administradores)
router.get('/invoices', authenticateToken, authorizeRoles(['ADMIN']), getAllInvoices);
// Descargar una factura en PDF
router.get('/invoices/:id/download', authenticateToken, authorizeRoles(['ADMIN']), downloadInvoicePDF);


export default router;