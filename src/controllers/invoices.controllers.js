import * as invoiceService from '../services/invoices.services.js'

//obtener una factura por id
export const getInvoiceById = async (req,res) =>{
    try {
        const invoice = await invoiceService.getInvoiceById(parseInt(req.params.id))
        if (!invoice) {
            return res.status(404).json({error:'Factura no encontrada'})
        }
        res.json(invoice)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Obtener todas las facturas del usuario autenticado
export const getInvoicesByUser = async (req, res) => {
    try {
        const invoices = await invoiceService.getInvoicesByUser(req.user.id);
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las facturas
export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceService.getAllInvoices();
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las facturas' });
    }
};
// Descargar una factura en PDF
export const downloadInvoicePDF = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await invoiceService.getInvoiceById(parseInt(id));
        if (!invoice) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        // Generar el PDF
        const doc = await invoiceService.generateInvoicePDF(invoice);

        // Establecer el encabezado de respuesta para la descarga
        res.setHeader('Content-disposition', 'attachment; filename=factura.pdf');
        res.setHeader('Content-type', 'application/pdf');

        // Enviar el PDF como respuesta
        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al generar el PDF' });
    }
};