import {prisma} from '../db/index.js'

//obtener una factura por su id
export const getInvoiceById = (id) =>{
    return prisma.invoice.findUnique({
        where: {id},
        include:{invoiceDetails:{include:{product:true}}}
    })
}

//obtener todas las facturtas de un usuario
export const getInvoicesByUser = (userId) =>{
    return prisma.invoice.findMany({
        where:{order:{userId}},
        include:{order:true}
    })
}