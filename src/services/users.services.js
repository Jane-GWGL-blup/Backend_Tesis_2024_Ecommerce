import bscrypt from 'bcryptjs'
import {prisma} from '../db/index.js'

// Listado 
export const getAllUsers = () => {
    return prisma.user.findMany()
}

// Creacion
// export const createNewUsers = (data) =>{
//     return prisma.user.create({
//         data
//     })
// }
//se registrara al usuario y se encriptara la contraseña
export const registerUser = async (data) =>{
    //se encriptara la contraseña
    const hashedPassword = await bscrypt.hash(data.password, 10)

    //Creando nuevo usuario en la base de datos
    return prisma.user.create({
        data:{
            ...data,
            password: hashedPassword
        }
    })
}

// Busqueda por ID
export const getAllUsersById = (id) =>{
    return prisma.user.findFirst({
        where:{
            id
        }
    })
}

// Eliminacion
export const deleteUser = (id) =>{
    return prisma.user.delete({
        where:{id}
    })
}

// Actualizacion
export const updateUser = (id, data) =>{
    return prisma.user.update({
        where:{id},
        data    
    })
}

// Actualizar rol del usuario
export const updateUserRole = (id, role) => {
    return prisma.user.update({
        where: { id },
        data: { role }
    });
};