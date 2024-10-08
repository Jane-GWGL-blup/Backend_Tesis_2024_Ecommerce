import {authenticateToken, authorizeRoles} from '../middlewares/auth.middleware.js'
import { Router } from "express" ;
import { getUsers,createUsers, getUsersById, deleteUsers, updateUsers,assignRole } from "../controllers/users.controllers.js";

const router = Router();

//ruta solo para administradoer
// listado de usuarios
router.get('/users', getUsers)
// creacion de usuarios
router.post('/users',authenticateToken, authorizeRoles(['ADMIN']), createUsers);

// listado de usuarios por id
/* router.get('/users/:id',authenticateToken, authorizeRoles(['ADMIN']), getUsersById) */
router.get('/users/:id', authenticateToken, getUsersById);

//eliminacion de usuarios 
router.delete('/users/:id', authenticateToken, authorizeRoles(['ADMIN']),deleteUsers)

//edicion de usuarios por id
router.put('/users/:id', authenticateToken, authorizeRoles(['ADMIN']), updateUsers)

// Ruta para asignar o cambiar rol de un usuario
router.put('/users/:id/role', authenticateToken, authorizeRoles(['ADMIN']), assignRole); // Cambiar el rol de usuario

export default router;
