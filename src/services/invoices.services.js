import {
    prisma
} from '../db/index.js'
import PDFDocument from 'pdfkit'

//obtener una factura por su id
export const getInvoiceById = async (id) => {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                order: {
                    include: {
                        user: true
                    }
                },
                invoiceDetails: {
                    include: {
                        product: true
                    }
                }
            }
        })
        return invoice
    } catch (error) {
        throw new Error('Error al obtener la factura')
    }
}

//obtener todas las facturtas de un usuario
// export const getInvoicesByUser = (userId) => {
//     return prisma.invoice.findMany({
//         where: {
//             order: {
//                 userId
//             }
//         },
//         include: {
//             order: true
//         }
//     })
// }

//obtener todas las facturas 
export const getAllInvoices = async () => {
    try {
        const invoices = await prisma.invoice.findMany({
            include: {
                order: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true // Asegúrate de incluir los campos que necesites
                            }
                        }
                    }
                },
                invoiceDetails: {
                    include: {
                        product: true // Incluimos también los detalles del producto en la factura
                    }
                }
            }
        });
        return invoices
    } catch (error) {
        throw new Error('Error al obtener las facturas ')
    }
}
//generar un pdf de la factura
export const generateInvoicePDF = async (invoiceId, res) => {
    try {
      // Obtener la factura y los detalles asociados
      const invoice = await prisma.invoice.findUnique({
        where: { id: parseInt(invoiceId) },
        include: {
          order: {
            include: {
              user: true,  // Incluimos la información del usuario
            },
          },
          invoiceDetails: {
            include: {
              product: true,  // Incluimos la información de los productos
            },
          },
        },
      });
  
      if (!invoice) {
        throw new Error('Factura no encontrada');
      }
  
      const companyName = "Alma Jewelry";  // Nombre de la empresa
  
      // Crear un documento PDF
      const doc = new PDFDocument({ margin: 50 });
  
      // Configuración de respuesta
      res.setHeader('Content-disposition', `attachment; filename=invoice-${invoice.invoiceNumber}.pdf`);
      res.setHeader('Content-type', 'application/pdf');
  
      // Añadir el contenido del PDF
      doc.fontSize(20).text(companyName, { align: 'center' });
      doc.fontSize(16).text('Invoice', { align: 'center' });
      doc.moveDown();
      
      // Información de la factura
      doc.fontSize(12).text(`Invoice Number: ${invoice.invoiceNumber}`);
      doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`);
      doc.text(`Total Amount: $${invoice.totalAmount.toFixed(2)}`);
      doc.moveDown();
      
      // Información del comprador
      doc.text(`Customer Name: ${invoice.order.user.name}`);
      doc.text(`Customer Email: ${invoice.order.user.email}`);
      doc.moveDown();
  
      // Detalles de productos
      doc.fontSize(14).text('Product Details:');
      doc.moveDown();
      invoice.invoiceDetails.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.product.name} (x${item.quantity}) - $${item.price.toFixed(2)} each - Total: $${(item.quantity * item.price).toFixed(2)}`);
      });
      doc.moveDown();
  
      // Total final
      doc.fontSize(14).text(`Total Amount: $${invoice.totalAmount.toFixed(2)}`, { align: 'right' });
  
      // Finalizar el PDF
      doc.end();
      
      // Enviar el documento a la respuesta
      doc.pipe(res);
  
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      res.status(500).json({ message: 'Error al generar el PDF de la factura' });
    }
};