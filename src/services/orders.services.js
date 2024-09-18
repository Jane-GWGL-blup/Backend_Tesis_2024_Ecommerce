import {prisma} from '../db/index.js';

// Listado
export const getAllOrders = () => {
    return prisma.order.findMany({
        include: {
            user: true
        } // con esto incluimos los datos del usuario logeado
    });
}

//creacion
export const createNewOrder = (data) => {
    return prisma.order.create({
        data: {
            user: {
                connect: {
                    id: data.userId
                }
            }, // conectamos con el usuario existente
            totalAmount: data.totalAmount
        }
    })
}

// Busqueda por Id
export const getAllOrdersById = (id) => {
    return prisma.order.findFirst({
        where: {
            id
        },
        include: {
            user: true
        } //se agrega los datos del usuario
    })
}

// Elimicación
export const deleteOrder = (id) => {
    return prisma.order.delete({
        where: {
            id
        }
    })
}

// Actualizacion 
export const updateOrder = (id, data) => {
    return prisma.order.update({
        where: {
            id
        },
        data
    })
}

// Calcular total 
export const calcularTotalAmount = async (orderId) => {
    try {
        
    } catch (error) {
        
    }
    //Obtener todos los OrderItems de una Orden
    const orderItems = await prisma.orderItem.findMany({
        where: {orderId}
    })

    // Calcular el total sumando el precio * cantidad de orderItem
    const totalAmount = orderItems.reduce((total,item) => {
        return total + (item.price * item.quantity)
    }, 0);

    //Actualizar el total en la tabla Order
    await prisma.order.update({
        where:{ id: orderId},
        data: {totalAmount}
    })

    return totalAmount;
}