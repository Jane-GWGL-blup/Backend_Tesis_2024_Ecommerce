import { prisma } from '../db/index.js';

// Obtener usuario por ID
export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: { id: userId },
    });
};

// Actualizar perfil del usuario
export const updateUser = (userId, data) => {
    return prisma.user.update({
        where: { id: userId },
        data,
    });
};

// Eliminar usuario por ID
export const deleteUser = (userId) => {
    return prisma.user.delete({
        where: { id: userId },
    });
};