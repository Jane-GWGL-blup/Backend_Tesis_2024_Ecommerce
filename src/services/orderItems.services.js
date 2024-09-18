import {prisma} from '../db/index.js'
import { calcularTotalAmount } from './orders.services.js'

//listado
export const getAllOrederItem = () => {
    return prisma.orderItem.findMany({
        include: {
            product: true,
        }
    })
}
//creacion
// export const createNewOrderItem = (data) => {
//     return prisma.orderItem.create({
//         data
//     })
// }

// Creacion nueva
export const createNewOrderItem = async (data) => {
    const newOrderItem = await prisma.orderItem.create({
        data
    })
    //calcular el total de la orden despues de agregar el item
    await calcularTotalAmount(newOrderItem.orderId)

    return newOrderItem
}

//Busqueda por Id
export const getAllOrderItemById = (id) => {
    return prisma.orderItem.findFirst({
        where: {
            id
        },
        include: {
            product: true
        }
    })
}

//Eliminacion
// export const deleteOrderItem = (id) => {
//     return prisma.orderItem.delete({
//         where: {
//             id
//         }
//     })
// }
//Nuevo eliminacion
export const deleteOrderItem = async(id) => {
    //obtener el orderItem antes de eliminarlo, para saber a que orden pertenece
    const orderItems = await prisma.orderItem.findUnique({
        where: {id}
    })

    // eliminar el orderItem
     const deleteOrderItems = await prisma.orderItem.delete({
         where: {id}
     })

     // Calcular el total de la orden despues de eliminar el item
    await calcularTotalAmount(orderItems.orderId)

    return deleteOrderItems
}

//Actualizacion
// export const updateOrderItem = (id, data) => {
//     return prisma.orderItem.update({
//         where: {
//             id
//         },
//         data
//     })
// }
//Nueva actualizacion
export const updateOrderItem = async (id, data) => {
    const updatedOrderItem = await prisma.orderItem.update({
        where: {
            id
        },
        data
    })

    //calcular el total de la orden al actualizar el item
    await calcularTotalAmount(updatedOrderItem.orderId)

    return updatedOrderItem
}