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
export const downloadInvoicePDF = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await invoiceService.getInvoiceById(parseInt(id));
        if (!invoice) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }

        // Generar el PDF y enviarlo en la respuesta
        await invoiceService.generateInvoicePDF(id, res);  // Aquí estamos pasando 'res' al servicio

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error al generar el PDF' });
        }
    }
};