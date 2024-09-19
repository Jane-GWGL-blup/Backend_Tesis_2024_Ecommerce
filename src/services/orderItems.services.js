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
    try {
        // Obtener el precio del producto desde la tabla Product
        const product = await prisma.product.findUnique({
            where:{id: data.productId}
        })

        //verificar si el producto existe
        if (!product) {
            throw new Error('Producto no encontrado')
        }

        //crear el nuevo orderItem con el precio del producto
        const newOrderItem = await prisma.orderItem.create({
            data: {
                orderId: data.orderId,
                productId: data.productId,
                quantity: data.quantity,
                price: product.price //asignar automaticamente el precio del producto
            }
        });

        if (!newOrderItem.orderId) {
            throw new Error('Order Id no encontrado en el OrderItem')
        }

        //calcular el total de la orden despues de agregar el item
        await calcularTotalAmount(newOrderItem.orderId)

        return newOrderItem

    } catch (error) {
        console.error("Error al crear el orderItem",error)
        throw new Error("Error al crear el item de la orden")
    }
    
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
    try {
        //obtener el orderItem antes de eliminarlo, para saber a que orden pertenece
        const orderItems = await prisma.orderItem.findUnique({
            where: {id}
        })
        // Verificar que el OrderItem exista y tenga un orderId válido
        if (!orderItems) {
            throw new Error('Item de orden no encontrado');
        }

        // eliminar el orderItem
        const deleteOrderItems = await prisma.orderItem.delete({
            where: {id}
        })

        // Calcular el total de la orden despues de eliminar el item
        await calcularTotalAmount(orderItems.orderId)

        return deleteOrderItems
    } catch (error) {
        console.error("Error al eliminar el OrderItem:", error);
        throw new Error("Error al eliminar el item de la orden");
    }
    
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