import bcrypt from 'bcryptjs'
import { generateToken } from '../services/auth.services.js'
import { prisma } from '../db/index.js'
import { registerUser, getAllUsers, getAllUsersById, deleteUser, updateUser } from "../services/users.services.js";

// Listado
export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' })
    }
}

// Creacion
export const createUsers = async (req, res) => {
    try {
        const newUser = await registerUser(req.body) //cambiamos createNewUser por registerUser
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' })

    }

}

// Busqueda por ID
export const getUsersById = async (req, res) => {
    /*     try {
            const userFound = await getAllUsersById(parseInt(req.params.id))
            if (!userFound) {
                return res.status(404).json({error: 'Usuario no encontrado'})
            }
            res.json(userFound)
        } catch (error) {
            res.status(500).json({error: 'Error al obtener el usiario'})
        } */

    const { id } = req.params;
    const userIdFromToken = req.user.id; 

    try {
        // Verificar si es admin o el propio usuario
        if (req.user.role === 'ADMIN' || userIdFromToken === parseInt(id)) {
            const userFound = await getAllUsersById(parseInt(id));
            if (!userFound) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(userFound);
        } else {
            return res.status(403).json({ message: 'No tienes permiso para acceder a estos datos.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}

// Eliminacion
export const deleteUsers = async (req, res) => {
    try {
        const userDelete = await deleteUser(parseInt(req.params.id))
        res.json(userDelete)
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' })
    }
}

// Actualizacion
export const updateUsers = async (req, res) => {
    try {
        const usersUpdate = await updateUser(parseInt(req.params.id), req.body)
        res.json(usersUpdate)
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' })
    }
}

