import {prisma} from '../db/index.js'
import PDFDocument from 'pdfkit'

//obtener una factura por su id
export const getInvoiceById = async(id) =>{
    try {
        const invoice = await  prisma.invoice.findUnique({
            where:{id: parseInt(id)},
            include:{order: true, invoiceDetails:{include:{product:true}}}
        })
        return invoice
    } catch (error) {
        throw new Error( 'Error al obtener la factura')
    }
}

//obtener todas las facturtas de un usuario
export const getInvoicesByUser = (userId) =>{
    return prisma.invoice.findMany({
        where:{order:{userId}},
        include:{order:true}
    })
}

//obtener todas las facturas 
export const getAllInvoices = async () => {
    try {
        const invoices = await prisma.invoice.findMany({
            include: {order: true,invoiceDetails:{include:{product}}}
        })
        return invoices
    } catch (error) {
        throw new Error('Error al obtener las facturas ')
    }
}
//generar un pdf de la factura
export const generateInvoicePDF = async (invoice) =>{
    try {
        //Crear un nuevo documento pfd
        const doc = new PDFDocument()
        // Escribir los detalles en el PDF
        doc.text(`Factura: ${invoice.invoiceNumber}`, { align: 'center' });
        doc.text(`Fecha: ${new Date(invoice.createdAt).toLocaleDateString()}`);
        doc.text(`Total: $${invoice.totalAmount.toFixed(2)}`);
        doc.text('--- Detalles de la Factura ---');

        invoice.invoiceDetails.forEach(item => {
            doc.text(`${item.product.name} - ${item.quantity} x $${item.price.toFixed(2)}`);
        });

        return doc;
    } catch (error) {
        throw new Error('Error al generar el PDF');
    }
}