import {prisma} from '../db/index.js';

//crear un nuevo descuento
export const createDiscount = async (data) => {
    try {
        return await prisma.discount.create({
            data,
        })
    } catch (error) {
        console.error('Error al crear el descuento:', error);
        throw new Error('Error al crear el descuento');
    }
    
}

//obtener los descuentos
export const getAllDiscounts =() =>{
    return prisma.discount.findMany({
        include:{
            product:true,
            category:true
        }
    })
}

// Buscar un descuento por código
export const getDiscountByCode = (code) => {
    return prisma.discount.findUnique({
        where: { code }
    });
}

// Actualizar un descuento
export const updateDiscount = async (id, data) => {
    try {
        return await prisma.discount.update({
            where: { id },
            data
        });
    } catch (error) {
        console.error('Error al actualizar el descuento:', error);
        throw new Error('Error al actualizar el descuento');
    }
};

// Eliminar un descuento
export const deleteDiscount = async (id) => {
    try {
        return await prisma.discount.delete({
            where: { id }
        });
    } catch (error) {
        console.error('Error al eliminar el descuento:', error);
        throw new Error('Error al eliminar el descuento');
    }
};
// Obtener un descuento por ID
export const getDiscountById = async (id) => {
    try {
        return await prisma.discount.findUnique({
            where: { id },
            include: {
                product: true,
                category: true
            }
        });
    } catch (error) {
        console.error('Error al obtener el descuento por ID:', error);
        throw new Error('Error al obtener el descuento por ID');
    }
};

