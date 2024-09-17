import {prisma} from '../db/index.js';

// Listado
export const getAllOrders =  ()=>{
    return prisma.order.findMany({
        include:{user:true} // con esto incluimos los datos del usuario logeado
    });
}

//creacion
export const createNewOrder = (data) =>{
    return prisma.order.create({
        data:{
            user: {connect: {id:data.userId}}, // conectamos con el usuario existente
            totalAmount: data.totalAmount
        }
    })
}

// Busqueda por Id
export const getAllOrdersById =  (id) =>{
     return prisma.order.findFirst({
         where:{id},
         include: {user:true} //se agrega los datos del usuario
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