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
    if (!data.name || !data.description) {
        throw new Error('El nombre y la descripción son obligatorios');
    }
    return prisma.category.create({
        data
    });
}

// Busqueda por ID
export const getAllCategoriesById = (id) =>{
    return prisma.category.findFirst({
        where:{id:parseInt(id)},
        include: {products:true,}//Incluye productos asociados a la categoria
        });
}

// Eliminacion
export const deleteCategory = async(id) =>{
     // Antes de eliminar la categoría, podrías actualizar los productos para que no queden sin categoría
     const productsToUpdate = await prisma.product.updateMany({
        where:{categoryId:id},
        data:{categoryId: null}
     })
    return prisma.category.delete({
        where: {id}
    })
}

// Actualizacion
export const updateCategory = (id,data) =>{
    if (!data.name || !data.description) {
        throw new Error('El nombre y la descripción son obligatorios');
    }
    return prisma.category.update({
        where:{
            id
        },
        data
    })
}