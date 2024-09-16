import {prisma} from '../db/index.js'

// Listado
export const getAllCategories = () => {
    return prisma.category.findMany({
      include: {
        products: true,
      }
    });
};

// creacion
export const createNewCategories = (data) => {
    return prisma.category.create({
        data
    });
}

// Busqueda por ID
export const getAllCategoriesById = (id) =>{
    return prisma.category.findFirst({
        where:{id},
        include: {products:true,}//Incluye productos asociados a la categoria
        });
}

// Eliminacion
export const deleteCategory = (id) =>{
    return prisma.category.delete({
        where: {id}
    })
}

// Actualizacion
export const updateCategory = (id,data) =>{
    return prisma.category.update({
        where:{
            id
        },
        data
    })
}