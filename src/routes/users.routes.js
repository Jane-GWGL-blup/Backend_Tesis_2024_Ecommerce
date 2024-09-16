import {authenticateToken} from '../middlewares/auth.middleware.js'
import { Router } from "express" ;
import { getUsers,createUsers, getUsersById, deleteUsers, updateUsers } from "../controllers/users.controllers.js";

const router = Router();

//login al perfil
router.get('/profile', authenticateToken, (req,res)=>{
    res.json({message: `Bienvenido ${req.user.name}`})
})

// listado de usuarios
router.get('/users',getUsers)
// creacion de usuarios
router.post('/users',createUsers);

// listado de usuarios por id
router.get('/users/:id',getUsersById)

//eliminacion de usuarios 
router.delete('/users/:id',deleteUsers)

//edicion de usuarios por id
router.put('/users/:id',updateUsers)

export default router;
