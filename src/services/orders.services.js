import {prisma} from '../db/index.js';

// Listado
export const getAllOrders =  ()=>{
    return prisma.order.findMany();
}

//creacion
export const createNewOrder = (data) =>{
    return prisma.order.create({
        data    
    })
}

// Busqueda por Id
export const getAllOrdersById =  (id) =>{
     return prisma.order.findFirst({
         where:{
             id
         }
     })
}

// Elimicación
export const deleteOrder = (id) =>{
    return prisma.order.delete({
        where:{ id }
    })
}

// Actualizacion 
export const updateOrder = (id,data) => {
    return prisma.order.update({
        where: {id},
        data
    })
}