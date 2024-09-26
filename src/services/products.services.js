import {prisma} from '../db/index.js'

// Listado
export const getAllProducts = () =>{
    return prisma.product.findMany(
        )
}

// Busqueda por ID
export const getAllProductsById = (id) => {
    return prisma.product.findFirst({
        where:{
            id
        },
        include:{
            category: true,
        }
    });
}

// Creacion
export const createNewProducts = (data) =>{
    return prisma.product.create({
        data
    });
}

// Eliminacion
export const deleteProduct = (id) =>{
    return prisma.product.delete({
        where:{
            id 
        }
    });
}

// Actualizacion
export const updateProduct = (id,data) =>{
    return prisma.product.update({
        where:{
            id
        },
        data 
    })
}