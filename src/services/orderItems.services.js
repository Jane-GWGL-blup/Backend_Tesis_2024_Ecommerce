import {prisma} from '../db/index.js'

//listado
export const getAllOrederItem = () =>{
    return prisma.orderItem.findMany({
        include:{
            product:true,
        }
    })
}

//creacion
export const createNewOrderItem = (data) =>{
    return prisma.orderItem.create({
        data
    })
}
//Busqueda por Id
export const getAllOrderItemById = (id) => {
    return prisma.orderItem.findFirst({
        where:{
            id
        },
        include:{product: true}
    })
}

//Eliminacion
export const deleteOrderItem = (id) =>{
    return prisma.orderItem.delete({
        where:{id}
    })
}

//Actualizacion
export const updateOrdenItem = (id,data) =>{
    return prisma.orderItem.update({
        where:{id},
        data
    })
}